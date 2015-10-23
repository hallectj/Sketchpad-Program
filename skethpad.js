var createSquares = function(id, boxAmt) {
    clearGrid();   
    var size = 960;        // gird is 960px long as instructions said

    for (var i = 0; i < boxAmt; i++) {
        for (var j = 0; j < boxAmt; j++) {
            var newDiv = document.createElement("div");       //I need to learn more about document fragment
            newDiv.className = "squares";                     //so I can append just one time.
            newDiv.style.height = Math.floor((size / boxAmt)) + "px";
            newDiv.style.width = Math.floor((size / boxAmt)) + "px";
            document.getElementById(id).appendChild(newDiv);
        }

    }
}


function isBorderChecked() {
    $('input[name=border_check]').change(function() {      
        if ($(this).is(':checked')) {
            $(".squares").css("border", "1px solid #fff");
        } else {
            $(".squares").css("border", "none");
        }
    });
    return undefined;
}

function getUserGridSize() {
    return document.getElementById("grid_square_size").value;     
}

function clearGrid() {
    $(".squares").css({
        "background-color": "#333",
        "opacity": "1"
    });
    $(".squares").unbind();    //just as a precaution, remove any binding event handlers
}

function sketch() {
    var userSize = getUserGridSize() || 10;
    clearGrid();
    $('input[name=border_check]').attr('checked', false);
    $(".squares").remove();
    createSquares("grid", userSize);


    $(".squares").on("mouseover", function() {
        $(this).addClass("hovered_square");
    });
}

var randomColorsGrid = function() {   
    var userSize = getUserGridSize();
    clearGrid();
    $('input[name=border_check]').attr('checked', false);
    $(".squares").remove();
    
    createSquares("grid", userSize);
    
    function genrateRGB() {
        var r = Math.floor(Math.random() * 255);    //change to 99 on all of them if doing hash color codes
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);

        return 'rgb(' + r + ',' + g + ',' + b + ')';
        //return '#' + r + '' + g + '' + b;           //uncomment for hash codes instead and comment above
    }
    
    $(".squares").on("mouseover", function() {
        $(this).css("background-color", genrateRGB());    //passing in a function that is called every
    });                                                   //time to always get random color
}

//Tried to make document.ready clean by calling functions that are only needed
$(document).ready(function() {
    //assignment calls for default grid on load
    var userSize = getUserGridSize() || 10;
    $('input[name=border_check]').attr('checked', false);
    isBorderChecked();
    sketch();

    $("#clear").on("click", function() {
        clearGrid();
    });

    $("#sketchIt").on("click", function() {
        sketch();
    });

    $("#randomColor").on("click", function() {
        randomColorsGrid();
    });
});