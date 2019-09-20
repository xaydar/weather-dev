
          let frm =   document.querySelector('form')
          frm.addEventListener('submit',(e)=>{
                console.log('testing........', frm.search.value)

                fetch( 'http://localhost:3000/weather?place='+frm.search.value).then((res)=>{
    
                    res.json().then((data)=>{
                        
                        if(data.error){
                            console.log('error !!! occurred')
                        }else{
                            document.querySelector('#weatherResult').textContent = data.place + '   '+data.data.temperature +'   '+data.data.windGust
                     console.log(data)
                        }
                    
                      
                    }).catch(error => console.log("there is not data"))
                    
                    }).catch(error => console.error("pthat is interesting"))

        e.preventDefault()
          })
