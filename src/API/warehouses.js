import { vizapi } from 'boot/vizapi'

export default{
    loadWarehouses(){
        console.log("%cCargando Almacenes...","font-size:2em; color:purple;");

        return vizapi.get('/location/cellers').then(succcess=>{
            console.log(succcess);
            return succcess.data.cellers;
        }).catch(fail=>{
            console.log(fail);
        });
    },
    loadSections(data){
        console.log("Traiendo secciones");
        return vizapi.get('/location/sections',data);
    },
    // loadSections(warehouse,raiz){
    //     console.log("%cCargando Secciones...","font-size:2em; color:purple;");

    //     let showprods = [];

    //     var products = [
    //         { id:1, code:"1023-L", ccode:"1000", location:27 },
    //         { id:2, code:"1023-A", ccode:"1001", location:28 },
    //         { id:3, code:"1023-B", ccode:"1002", location:29 },
    //         { id:4, code:"1023-R", ccode:"1003", location:30 },
        
    //         { id:5, code:"1025-L", ccode:"1004", location:31 },
    //         { id:6, code:"1025-A", ccode:"1005", location:32 },
    //         { id:7, code:"1025-B", ccode:"1007", location:27 },
    //         { id:8, code:"1025-R", ccode:"1008", location:28 },
        
    //         { id:9, code:"1026-L", ccode:"1009", location:29 },
    //         { id:10, code:"1026-A", ccode:"1010", location:30 },
    //         { id:11, code:"1026-B", ccode:"1011", location:31 },
    //         { id:12, code:"1026-R", ccode:"1011", location:32 },
    //         { id:13, code:"1026-N", ccode:"1011", location:32 },

    //         { id:14, code:"2610-L", ccode:"1009", location:39 },
    //         { id:15, code:"2610-A", ccode:"1010", location:39 },
    //         { id:16, code:"2610-B", ccode:"1011", location:40 },
    //         { id:17, code:"2610-R", ccode:"1011", location:40 },
    //         { id:18, code:"2610-N", ccode:"1011", location:41 }
    //     ];
        
    //     var sections = [
    //         { id:1, warehouse:1, children:true, root:0, name:"Planta Baja", alias:"PB" },
    //         { id:2, warehouse:1, children:true, root:0, name:"Piso 1", alias:"P1" },
    //         { id:3, warehouse:1, children:true, root:0, name:"Piso 2", alias:"P2" },
    //         { id:4, warehouse:1, children:true, root:0, name:"Piso 3", alias:"P3" },

    //         { id:21, warehouse:1, children:true, root:1, name:"Pasillo 1", alias:"P1" },
    //         { id:22, warehouse:1, children:true, root:1, name:"Pasillo 2", alias:"P2" },
    //         { id:23, warehouse:1, children:true, root:1, name:"Pasillo 3", alias:"P3" },
    //         { id:24, warehouse:1, children:true, root:1, name:"Pasillo 4", alias:"P4" },
    //         { id:25, warehouse:1, children:true, root:1, name:"Pasillo 5", alias:"P5" },
    //         { id:26, warehouse:1, children:true, root:1, name:"Pasillo 6", alias:"P6" },

    //         { id:27, warehouse:1, children:true, root:21, name:"Tarima 1", alias:"T1" },
    //         { id:28, warehouse:1, children:true, root:21, name:"Tarima 2", alias:"T2" },
    //         { id:29, warehouse:1, children:true, root:21, name:"Tarima 3", alias:"T3" },
    //         { id:30, warehouse:1, children:true, root:21, name:"Tarima 4", alias:"T4" },
    //         { id:31, warehouse:1, children:true, root:21, name:"Tarima 5", alias:"T5" },
    //         { id:32, warehouse:1, children:true, root:21, name:"Tarima 6", alias:"T6" },

    //         { id:33, warehouse:1, children:true, root:2, name:"Pasillo 1", alias:"P1" },
    //         { id:34, warehouse:1, children:true, root:2, name:"Pasillo 2", alias:"P2" },
    //         { id:35, warehouse:1, children:true, root:2, name:"Pasillo 3", alias:"P3" },
    //         { id:36, warehouse:1, children:true, root:2, name:"Pasillo 4", alias:"P4" },
    //         { id:37, warehouse:1, children:true, root:2, name:"Pasillo 5", alias:"P5" },
    //         { id:38, warehouse:1, children:true, root:2, name:"Pasillo 6", alias:"P6" },

    //         { id:39, warehouse:1, children:true, root:33, name:"Tarima 1", alias:"T1" },
    //         { id:40, warehouse:1, children:true, root:33, name:"Tarima 2", alias:"T2" },
    //         { id:41, warehouse:1, children:true, root:33, name:"Tarima 3", alias:"T3" },
    //         { id:42, warehouse:1, children:true, root:33, name:"Tarima 4", alias:"T4" },
    //         { id:43, warehouse:1, children:true, root:33, name:"Tarima 5", alias:"T5" },
    //         { id:44, warehouse:1, children:true, root:33, name:"Tarima 6", alias:"T6" },
            
    //         { id:5, warehouse:1, children:true, root:1, name:"Cuarto A", alias:"CA" },
            
    //         { id:6, warehouse:1, children:true, root:2, name:"Cuarto A", alias:"CA" },
    //         { id:7, warehouse:1, children:true, root:2, name:"Cuarto B", alias:"CB" },
            
    //         { id:8, warehouse:1, children:true, root:3, name:"Cuarto A", alias:"CA" },
    //         { id:9, warehouse:1, children:true, root:3, name:"Cuarto B", alias:"CB" },
    //         { id:10, warehouse:1, children:true, root:3, name:"Cuarto C", alias:"CC" },
            
    //         { id:11, warehouse:1, children:false, root:4, name:"Anaquel 1", alias:"A1" },
    //         { id:12, warehouse:1, children:false, root:4, name:"Anaquel 2", alias:"A2" },
    //         { id:13, warehouse:1, children:false, root:4, name:"Anaquel 3", alias:"A3" },
    //         { id:14, warehouse:1, children:false, root:4, name:"Anaquel 4", alias:"A4" },
            
    //         { id:15, warehouse:1, children:false, root:5, name:"Anaquel 1", alias:"A1" },
    //         { id:16, warehouse:1, children:false, root:5, name:"Anaquel 2", alias:"A2" },
    //         { id:17, warehouse:1, children:false, root:5, name:"Anaquel 3", alias:"A3" },
    //         { id:18, warehouse:1, children:false, root:5, name:"Anaquel 4", alias:"A4" },
            
    //         { id:19, warehouse:1, children:false, root:6, name:"Anaquel 1", alias:"A1" },
    //         { id:20, warehouse:2, children:false, root:0, deep:0, name:"Pasillo 1", alias:"P1" }
    //     ];

    //     function roots(wrhs,root){//retorna las racies del almacen
    //         console.log(`Generando raices para ${wrhs},${root}`);
    //         return sections.filter(sec => { return (sec.root==root&&sec.warehouse==wrhs) });
    //     }

    //     function setTree(roots,loc=null){
    //         roots.map( sec => {
    //             let putloc=loc?`${loc}-`:``;
    //             let setlocation=`${putloc}${sec.alias}`;
    //             let prods = products.filter( prod => { return prod.location==sec.id });
    //             for (const prod of prods) { 
    //                 prod.loc=setlocation;
    //                 showprods.push(prod);
    //             }
                
    //             sec.products=prods;
    //             sec.label=`${sec.name} (${sec.alias})`;
    //             sec.value=sec.id;
    
    //             sec.sections=null;
    //             if(sec.children){
    //                 sec.sections = sections.filter( sect => { return sect.root==sec.id });
    //                 setTree(sec.sections,setlocation);
    //             }
    //         });
    //     }

    //     var roots = roots(warehouse,raiz);
    //     console.log("Generando arbol..");
    //     setTree(roots);

    //     return { sects:roots,prods:showprods };
    // },
    product(data){
        console.log(data);
        return vizapi.get('/location/product',data);
    }
}