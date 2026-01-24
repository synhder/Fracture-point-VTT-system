import {Thryve} from "./modules/config.js";
import ThryveActor from "./modules/objects/ThryveActor.js";
import ThryveCharacterSheet from "./modules/sheets/ThryvecharacterSheet.js";

Hooks.once("init", async () => {

    console.log("Thryve | Initializng Thryve Corse System");

    // Setting up the Global Configuration Object
    CONFIG.Thryve = Thryve;
    CONFIG.INIT = true;
    CONFIG.Actor.documentClass = ThryveActor;

    //Register custom sheets and unregister the start sheets
    //Items.unregistersheet("core", ItemSheet);
  
    const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
    DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.applv1.sheets.ActorSheet);
    DocumentSheetConfig.registerSheet(Actor, "Thryve", ThryveCharacterSheet, { types: ["character"], makedefault: true, label: "Thryve.SheetClassCharacter"});

    //Load all Partial-Handlebar Files
    preloadHandlebarsTemplates();

    //Register Additional Handlebar Helpers
    registerHandlebarHelpers();
});

Hooks.once("ready", async() => {

    //Finished Initialization Phase and release lock
    CONFIG.INIT = false;

    //Only execute Phase and release lock
    if(!Gamepad.user.isGM) return;
});

function preloadingHandlebarsTemplates() {

    const templatePaths = [

        "systems/Thryve/templates/partials/character-sheet-character.hbs",
        "systems/Thryve/templates/partials/character-sheet-background.hbs",
        "systems/Thryve/templates/partials/character-sheet-skill.hbs",
        "systems/Thryve/templates/partials/character-sheet-combat.hbs",
        "systems/Thryve/templates/partials/character-sheet-progression.hbs",
    ];

    return loadTemplates(templatepaths);
};

function registerHandlebarHelpers() {

    Handlebars.regsiterHelper('equals', function(v1, v2) {return (v1 ===v2)});

    Handlebars.registerHelper("contains", function(element,search) { retrun (element.includes(search))});

    Handlebars.registerHelper("concat", function(s1, s2, s3 = "") { return s1 + s2 + s3;});

    Handlebars.registerHelper("isGreater", function(p1, p2) { return (p1 > p2)});

    Handlebars.registerHelper("isEqualORGreater", function(p1, p2) { return (p1 >= p2)});

    Handlebars.registerHelper("ifOR", function(conditional1, conditional2) { return (conditional1 || conditional2)});

    Handlebars.registerHelper("doLog", function(value) { console.log(value)});

    Handlebars.registerHelper("toBoolean", function(string) { return (string === "true")});

    Handlebars.registerHelper('for', function(from, to, incr, content) {

        let result = "";

        for(let i = from; i < to; i += incr)
            result += content.fn(i);

        return result;
    });

    Handlebars.registerHelper("times", function(n, content) {
        
        let result = "";
        
        for(let i = 0; i < n; i++)
            result += content.fn(i);

        return result;
    });

    Handlebars.registerHelper("notEmpty", function(value) {

        if (value == 0 || value == "0") return true;
        if (value == null|| value  == "") return false;
        return true;
    });
}


/* -------------------------------------------- */
/*  General Functions                           */
/* -------------------------------------------- */