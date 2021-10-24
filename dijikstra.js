function creategraph(V, E){
    let adj_list = [] ; 
    for(let i = 0 ; i < V ; i++){
        adj_list.push([]) ; 
    }

    for(let i = 0 ; i < E.length ; i++){
        adj_list[E[i][0]].push([E[i][1] ,  E[i][2]]) ; 
        adj_list[E[i][1]].push([E[i][0] , E[i][2]]) ;  
    
    }

    return adj_list ; 

}

function dijikstra(graph , V , src){
    let vis = Array(V).fill(0) ; 
    let dist = [] ; 
    for(let i = 0 ; i < V ; i++){
        dist.push([1000,-1]) ; 
    }

    dist[src][0] = 0 ;  

    for(let i = 0 ; i < V-1 ; i++){
        let mn = -1 ; 
        for(let  j = 0 ;  j < v ; j++){
            if(vis[j] == 0){
                if(mn == -1 || dist[j][0] < dist[mn][0]){
                    mn = j ; 
                }
            }
        }

        vis[mn] = 1 ; 
        for(let j = 0 ; j < graph[mn].length ; j++){
            let edge = graph[mn][j] ; 
            if(vis[edge[0]] == 0 && dist[edge[0]][0] > edge[1] + dist[mn][0] ){
                dist[edge[0]][0] = edge[1] + dist[mn][0] ; 
                dist[edge[0]][1] = mn ; 
            }
        }
    }



return dist ; 




}