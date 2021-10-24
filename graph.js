function djikstra(graph, sz, src) {
    let vis = Array(sz).fill(0);
    let dist = [];
    for(let i=1;i<=sz;i++)
        dist.push([10000,-1]);
    dist[src][0] = 0;

    for(let i=0;i<sz-1;i++){
        let mn = -1;
        for(let j=0;j<sz;j++){
            if(vis[j]===0){
                if(mn===-1 || dist[j][0]<dist[mn][0])
                    mn = j;
            }
        }

        vis[mn] = 1;
        for(let j in graph[mn]){
            let edge = graph[mn][j];
            if(vis[edge[0]]===0 && dist[edge[0]][0]>dist[mn][0]+edge[1]){
                dist[edge[0]][0] = dist[mn][0]+edge[1];
                dist[edge[0]][1] = mn;
            }
        }
    }

    return dist;
}

function solveData(sz){

let data = curr_data ; 
let graph = [] ; 
for(let i =1 ; i <= sz ; i++){
    graph.push([]) ; 
}

for(let i = 0 ; i < data['edges'].length ; i++){

    let edge  = data['edges'][i] ; 
    if(edge['type'] == 1)
        continue ; 
    graph[edge['to']-1].push([edge['from']-1 ,  parseInt(edge['label'])]) ; 
    graph[edge['from']-1].push([edge['to']-1 ,  parseInt(edge['label'])]) ; 

}


let dist1 = dijikstra(graph ,sz , src-1) ; 
let dist2 = dijikstra(graph , sz , dst-1) ; 


let mn_dist = dist1[dst-1][0] ; 

let plane = 0 ; 
let p1 = -1 , p2 = -1 ; 


for(let pos in data['edges']){
    let edge = data['edges'][pos] ; 
    if(edge['type'] === 1){

        let to  = edge['to']-1 ; 
        let from = edge['from'] -1 ; 
        let wght = parseInt(edge['label']) ; 
        if(dist1[to][0] + wght + dist2[from][0] > mn_dist){
            mn_dist = dist1[to][0] + wght + dist2[from][0] ; 
            plane = wght;
            p1 = to;
            p2 = from;
        } 

        if(dist2[to][0] + wght + dist1[from][0] > mn_dist){
            plane = wght;
            p2 = to;
            p1 = from;
            mn_dist = dist2[to][0] + wght + dist1[from][0] ; 
        } 

    }

}


new_edges = [] ; 
if(plane !== 0 ){

    new_edges.push({
        arrows : {
            to : {
                enabled : true 
            }
        }, 
        from: p1 + 1,
        to : p2 + 1,
        color: 'green ' , 
        label : String(plane)


    }) ;
    new_edges.concat(pushEdges(dist1, p1, false));
    new_edges.concat(pushEdges(dist2, p2, true));

}else{
    new_edges.concat(pushEdges(dist1, dst-1, false));
}

const ans_data = {
    nodes: data['nodes'],
    edges: new_edges
};
return ans_data;
}

function pushEdges(dist, curr, reverse) {
    let tmp_edges = [];
    while(dist[curr][0]!==0){
        let fm = dist[curr][1];
        if(reverse)
            tmp_edges.push({arrows: { to: { enabled: true}},from: curr+1, to: fm+1, color: 'orange', label: String(dist[curr][0] - dist[fm][0])});
        else
            tmp_edges.push({arrows: { to: { enabled: true}},from: fm+1, to: curr+1, color: 'orange', label: String(dist[curr][0] - dist[fm][0])});
        curr = fm;
    }
    return tmp_edges;
}
