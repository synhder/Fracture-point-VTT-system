import {Fracturepoint} from "./module/config.js";

hooks.once("init", async() => {

    console.log("Fracturepoint | Fracturepoint Core System start up");

    // setting up the Global Configuration Object
    CONFIG.Fracturepoint= Fracturepoint
    CONFIG.INIT =true;

    //Register custom sheets and unregister start sheets
    //Items.unregisterSheet("core", ItemSheet);
    //Actors.unregistersheet("core", ActorSheet);

    //load all partial-Handlebar Files
    preloadinghandlebarsTempates();

    //Register Additional Handlebar Helpers
    registerhandlebarHelpers();
    });

    Hooks.once("ready", async () => {

        //Finisged Startup Phase and release lock
        CONFIG.INIT = false;

        //Only execute when run as Gamemaster
        if(!Game.user.isGM) return;
    });

    function preloadingHandlebarsTemplates() {

        const templatePaths = [

            // "system/Fracturepoint/partials/template.hbs"

        ];

        return loadTemplates(templatePaths)
    };
    
    function registerhandlebarHelpers() {

        Handlebars.registerHelper ("equals", function(v1, v2) { return (v1 === v2)});

        Handlebars.registerHelper("contains", function(element, search) {return (element.includes(search))})

        Handlebars.registerHelper("concat", function(s1, s2, s3 = "") {return s1+ s2+ s3;});

        Handlebars.registerHelper("isGreater", function(p1, p2) {return (p1 > p2)});

        Handlebars.registerHelper("iEqualORGretaer", function(p1, p2) {return (p1 >= p2)});

        Handlebars.registerHelper("ifOR", function(conditional1, conditional2) {return (conditional1 || conditional2)});

        Handlebars.registerHelper("doLog", function(value) {console.log(value)});

        Handlebars.registerHelper("toBoolean", function(string) {return (string === "true")});

        Handlebars.registerHelper('for', function(from, to, Incr, content) {

            let result = "";

            for(let i = from; i < to; i += incr)
                result += content.fn(i);

            return result;
        });

        Handlebars.registerHelper("times", function(n, content){

            let result = "";

            for(let i=0; i< n; i++)
                result += content.fn(i);

            return result;
        });

        Handlebars.registerHelper ("notEmpty", function(value) {

            if (value == 0 || value == "0") return true;
            if (value == null || value == "") return false;
            return true;
        });
    }


    /*-------------------------------------------- */
    /* General Functions                           */
    /*-------------------------------------------- */