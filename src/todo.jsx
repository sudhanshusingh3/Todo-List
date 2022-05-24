import { useState ,useEffect} from "react"

const getLocalData=()=>{
    const list=localStorage.getItem("mytodolist");
    if(list){
        return JSON.parse(list);
    }else{
        return [];
    }
}
const Todo=()=>{
    const [inputdata,setInputData]=useState("")
    const [items,setItems]=useState(getLocalData())
    const [isEdit,setIsEdit]=useState("")
    const [currentEditItem,setCurrentEditItem]=useState("")
    
    const addItem=()=>{
        if(!inputdata){
            alert("fill the data")
        }
        else{
        const myInputData={
                id:new Date().getTime().toString(),
                name:inputdata,
            }
            setItems([...items,myInputData])
            setInputData("")
        }
        
    }
    
    const deleteItem=(index)=>{
        const updatedItem=items.filter((ele)=>{
            return ele.id !== index
        })
        setItems(updatedItem)
    }
    const editItem=(item)=>{
        setIsEdit(item.id);
        setCurrentEditItem(item.name);
        


    }
    const onSave=()=>{
        let index = items.findIndex((item)=>item.id === isEdit)
           
 
          console.log(index)
          const taskList=[...items]
          taskList[index].name=currentEditItem
          setItems(taskList)
          setIsEdit("");
          setCurrentEditItem("");
    }
    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items));
    },[items])
return (<>
<div className="main">
    <div className="child">
        <div className="addItems">
            <input type="text" 
               placeholder="Add Item" value={inputdata}
               onChange={(eve)=>setInputData(eve.target.value)}/>
               <button onClick={addItem}>Add Item</button>
        </div>
    <div className="showItem">
    {items.map((ele,index)=>{
        return(<div className="items"key={ele.id}>
               {isEdit===ele.id?<input type="text" value={currentEditItem} onChange={(event)=>{setCurrentEditItem(event.target.value)}}/>:<h3>{ele.name}</h3>}
                {isEdit===ele.id?<button onClick={onSave}>Save</button>:<button onClick={()=>editItem(ele)}>Edit</button>}
            <button onClick={()=>deleteItem(ele.id)}>Delete</button>
        </div>)
    })}
    </div>
    </div>


</div>
</>)
}

export default Todo