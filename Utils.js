var Promise = require('bluebird');
var Client = require('node-rest-client').Client;

exports.es_index = function(jsonArr){

    var part_es_endpoint = 'http://localhost:9200/humane_cockpit_ver1/dummy_cardekho/_bulk?pretty';

    var client = new Client();

    var baseStr = "";
    //console.log(jsonArr);
    console.log('Size of the array -- '+jsonArr.length);

    for(var k = 0 ; k < jsonArr.length ; k++){
        var obj1 = jsonArr[k];
        obj1.timePoint = obj1.timePoint+"0000";
        baseStr = baseStr + "{\"index\":{\"_id\":\""+obj1['id']+"\"}}\n" + JSON.stringify(obj1)+"\n";
        //var str1 = ; //

    }

    console.log('Bulk Update Content --- \n');
    //console.log(baseStr);

// request and response additional configuration
    var args = {
        headers: { "Content-Type": "text/plain" },
        data: baseStr,
    };

    try{
        client.post(part_es_endpoint, args, function (data, response) {
            // parsed response body as js object
            //console.log(JSON.stringify(data));
            var arr_internal = data.items;
            //console.log(JSON.stringify(arr_internal));
            arr_internal.forEach(function(a_obj){
                try{
                    var failure_count = a_obj.index._shards.failed;
                    if(failure_count != 0 ){
                        console.log(JSON.stringify(a_obj));
                    }
                }catch(e){
                    console.log(JSON.stringify(a_obj));
                }
            });
            // raw response
            //console.log(response);
        });
    }catch(error){
        console.log(error);
    }

};

exports.guid = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}