function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'google_maps.json', true); 
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            var responseText = xobj.responseText;
            // Parse JSON string into object
            var actual_JSON = JSON.parse(responseText);
            callback(actual_JSON);
        }
    };
    xobj.send(null);  
}

function viewJSON() {
    loadJSON(function(response) {
        /* Aqui l'objecte response representa l'objecte JSON que ens 
        ha retornat el servidor */
        var llistat = ""; /* Amb aquesta variable el document html treurà el llistat de restaurants
        /* aquest for serveix per repetir els elements del restaurant */
        for(i in response.results){   
            var restaurant = response.results[i];
            var arrayRest = ""; 
            /* aquest for serveix per repetir els elements de restaurant.type */
            for(j in restaurant.types){
                arrayRest = arrayRest + restaurant.types[j]+", ";
            }
            
            llistat = llistat + "<h1>" + restaurant.name + "<img src=' "+restaurant.icon+"'>" + "</h1> <br>"
            + "Direcció: " + restaurant.vicinity + "<br>"
            + "Latitud: " + restaurant.geometry.location.lat + "<br>"
            + "Longitud: " + restaurant.geometry.location.lng + "<br>"
            + "Tipus: " + arrayRest + "<br>";
        }
        /* enllaçam la variable llista al document html */
        document.getElementById("results").innerHTML = llistat;
    });
}

