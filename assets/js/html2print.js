jQuery(document).ready(function($) {
    console.log("launching html2print");

    // ________________________________ INIT __________________________________ //
    $("body").wrapInner("<div id='h2p-content'></div>");

    // INSERTING THE PAGES STRUCTURE
    window.setTimeout(function(){
        $("body").prepend(page_structure).ready(function(){
            // Calculating the number of pages needed
            var content_height = $("body").height();
            var body_height = $($("#h2p-master-page .h2p-body")[0]).height();
            var nb_page = Math.ceil(content_height / body_height) + 20;

            // Cloning the master page
            for (i = 1; i <= nb_page; i++){
                $("#h2p-master-page").clone().attr("id","h2p-page-"+i).insertBefore($("#h2p-master-page"));
            }
            
            $("#h2p-master-page").attr("data-width", $(".h2p-paper:first-child").width()).hide();
            $("#h2p-master-page .h2p-recipient").removeClass("h2p-recipient");
            $("body").css("width", "100%");
            $("html").css("width", "100%");

        });
    }, 1000);


    // REMOVE BLANK PAGES
    // This does not seem to work?
    //$.getScript("/assets/js/css-regions-polyfill.js", function(){
        window.setTimeout(function(){
           var f = document.getNamedFlow('flow-main');
           console.log("Wait for CSS Regions polyfill to finish its job.");
           f.addEventListener('regionfragmentchange', function(event) {
               
               // validate the target of the event
               if(event.target !== f) {debugger; return;}
               
               // write something in the console
               console.log("CSS Regions polyfill done.");
               // REMOVE EMPTY PAGES
               $("cssregion").each(function(){
                   console.log($(this));
                   if(this.textContent == ""){
                       console.log($(this).parent().parent().parent());
                       $(this).parent().parent().parent().hide();
                   }
               });
           });
        }, 2000);
    //});

});

