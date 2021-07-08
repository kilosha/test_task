var list_content = [{"id":1,"text":"Dashboard"}, {"id":2,"text":"Users"}, {"id":3,"text":"Products"}, {"id":4,"text":"Locations"}];

var small_film_set = [
	{ id:1, title:"The Shawshank Redemption", year:1994, votes:678790, rating:9.2, rank:1, category:"Thriller"},
	{ id:2, title:"The Godfather", year:1972, votes:511495, rating:9.2, rank:2, category:"Crime"},
	{ id:3, title:"The Godfather: Part II", year:1974, votes:319352, rating:9.0, rank:3, category:"Crime"},
	{ id:4, title:"The Good, the Bad and the Ugly", year:1966, votes:213030, rating:8.9, rank:4, category:"Western"},
	{ id:5, title:"Pulp fiction", year:1994, votes:533848, rating:8.9, rank:5, category:"Crime"},
	{ id:6, title:"12 Angry Men", year:1957, votes:164558, rating:8.9, rank:6, category:"Western"}
];


var row1 = {
    view:"toolbar",
    css:"webix_dark",
    id:"myToolbar",
    paddingX: 10,
    cols : [
        { view:"label", label: "My App", id: "label",  autowidth:true},
        {},
        { view:"button", type:"icon", icon:"mdi mdi-account", label:"Profile", autowidth:true, css: "webix_transparent"},
    ]
};


var form = { 
            view:"form",
            id:"film_form",
            minWidth:200,             
            paddingX:0,
            borderless:true,
            elements:[
                {view:"text", name:"title", id:"inp_title", label:"Title"},
                {view:"text", name:"year", id:"inp_year", label:"Year"},
                {view:"text", name:"rating", id:"inp_rating", label:"Rating"},
                {view:"text", name:"votes", id:"inp_votes", label:"Votes"},
                {cols : [
                    {
                        view:"button", id:"btn_add", minWidth:65, value:"Add new",
                        css:"webix_primary",
                        click: addItem
                    },
                    {
                        view:"button", id:"btn_clear", minWidth:65, value:"Clear",
                        click: clearForm
                    }
                ]} 
            ]
};


var list = {
            view:"list",
            template:"#text#",
            minWidth: 150,
            select:true,
            scroll: false,                
            data:list_content
};


var row2 = {
    cols: [
        {   gravity: 0.75,
            rows: [   
                list, 
                { view:"label", label: "&#10003 Connected", css:"green_label"}
            ]
        },
        {   view:"resizer" },
        {  
            view:"datatable",
            id:"film_datatable",
            gravity: 4,
            columns:[
                {id:"title", header:"Title",fillspace: 1.5},
                {id:"year", header:"Year",fillspace: 1},
                {id:"votes", header:"Votes",fillspace: 1},
                {id:"rating", header:"Rating",fillspace: 1},
                {id:"rank", header:"Rank",fillspace: 1}
            ],
            scrollX: false,
            data:small_film_set    
        },
        { 
            gravity: 1.2,
            type:"clean",
            paddingY:20 ,
            paddingX:25, 
            rows: [ 
                {  view:"template", template:"Edit films", type:"section" },
                form,
                {}
            ]   
        }
    ]
};


webix.ui({
    rows:[
        row1,
        row2,
        { 
           template:"The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved (c)",
           height: 30, css:"text_template"
        }
    ]
 });
 
 
function addItem() {
    var item_data = $$("film_form").getValues();
    var film_datatable = $$("film_datatable");
    var last_rank = film_datatable.getItem(film_datatable.getLastId()).rank;
    film_datatable.add(item_data); 
    film_datatable.updateItem(film_datatable.getLastId(), {"rank" : last_rank+1 });
    $$("film_form").clear();       
}

function clearForm(){
	$$("film_form").clear();
}