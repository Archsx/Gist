function initUpload(){
    var chunk = 100 * 1024
    var input = document.querySelector('#file')
    input.onchange = function(e){
        var file = this.files[0];
        var query = {}
        var chunks = [];
        if(!!file){
            var start = 0;
            for(var i = 0; i < Math.ceil(file.size / chunk);i++){
                var end = start + chunk;
                chunks[i] = file.slice(start,end)
                start = end
            }

            query = {
                fileSize:file.size,
                dataSize:chunk,
                nextOffset:0
            }
    
            upload(chunks,query,successPerUpload)


        }

    }

}


function upload(chunks,query,cb){
    var queryStr = Object.keys(query).map(key =>{
        return key + '=' + query[key]
    }).join('&')
    var xhr = new XMLHttpRequest()
    xhr.open('POST','http://xxx/upload?' + queryStr);
    xhr.overrideMimeType('application/octet-stream')


    var index = Math.floor(query.nextOffset / query.dataSize)
    getFileBinary(chunks[index],function(binary){
        if(xhr.sendAsBinary){
            xhr.sendAsBinary(binary)
        }else{
            xhr.send(binary)
        }
    })


    xhr.onreadystatechange = function(e){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var resp = JSON.parse(xhr.responseText)

                //resp = {
                //     isFinish:false,
                //     offset:100 * 1024   
                // }



                if(typeof cb === 'function'){
                    cb.call(this,resp,chunks,query)
                }
            }
        }
    }

}


function successPerUpload(resp,chunks,query){
    if(resp.isFinish === true){
        alert("上传成功")
    }else{
        query.offset = resp.offset
        upload(chunks,query,successPerUpload)
    }
}


function getFileBinary(file,cb){
    var reader = new FileReader()
    reader.readAsArrayBuffer(file);
    reader.onload = function(e){
        if(typeof cb === "function"){
            cb.call(this,this.result)
        }
    }
}

