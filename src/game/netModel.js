export default class netModel { 
     
    init (self) {  
        return this
    }
    
    run (logicObj) {
        if (logicObj.is_runing) return
        var dst = {id:213,steam_coins:3433,gem:{id:3,footer:[],top:[],"addscore":5,"basescore":50500}} 

        var level = 1
        for(var i = 0; i < level+4; i++){
            //定义 每个元素是 长度为4的数组
            dst.gem.footer[i] = new Array(level+3);
            for(var j = 0; j < level+3; j++){
                dst.gem.footer[i][j] = Math.round(Math.random()*4+1) 
            }
        }
 
        var randNum = Math.random();
        //判断是否产生钻头,矩阵中数字0表示钻头
        if (randNum < 0.8) {
            var x = Math.round(Math.random()*(level+2))
            var y = Math.round(Math.random()*(level+2))
            dst.gem.footer[x][y] = 6
        }

        
        for(var i = 0; i < 1000; i++){
            var n = Math.round(Math.random()*4+1) 
            dst.gem.top.push(n)
        }

        console.log("+++++++下拉随机数据+++++++")
        
        return dst
        /*
        var dst = '{"id":20210330645, "gem": {"id":20210303229,"footer":[[2,6,3,5],[3,3,2,3],[1,3,3,3],[1,4,5,3],[3,1,5,1]],"top":[5,3,4,2,4,5,2,4,4],"addscore":5,"basescore":10}, "steam_coins": 59915}'
        var show = JSON.parse(dst)
        
        console.log("+++++++下拉随机数据+++++++")

        return show
        */
    }
 
    history (data) {
        console.log("+++++++上报+++++++",data) 
    }
} 