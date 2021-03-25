import * as Parkmyst from "./library/parkmyst-1";

interface TobacoState {
    feedId: string;
}

interface TobacoEvent extends Parkmyst.ComponentEvent {
    type: 'tobacoDone'
}

function isTobacoEvent(event: Parkmyst.ComponentEvent): event is TobacoEvent {
    return event.type === "tobacoDone";
}

export class TobacoComponent extends Parkmyst.Component<object, TobacoState> {

    description = "This is a component gives the player a chance to fill a tobaco!";

    schema: Parkmyst.JSONSchema7 = {
        "$schema": "http://json-schema.org/draft-07/schema",
        "type": "object",
        "additionalProperties": false,
        "required": [],
        "properties": {}
    };

    outputTemplates: Parkmyst.OutputTemplates = {
        tobacoTemplate: {
            template: `<div id="dropZone">
            <div id="dropBox1">
                <img id="pipe" src="https://i.ibb.co/ctj3zn5/pipe-159453-1280.png" alt="">
            </div>
        </div>
    
        <div id="pipe">
            <img id="four-twenty" src="https://i.ibb.co/vv6Yqch/tobacco.png" draggable="true" width="300" />
        </div>
    
        <form id="tobacoForm">
            <button id="tobacoDone" type="submit" inputtype="tobacoDone">
                Done
            </button>
        </form>

        <style>
            #dropZone,
            #pipe {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            min-height: 200px;
            margin-bottom: 20px;
            }
            
            #dropBox1,
            #dropBox2,
            #dropBox3,
            #dropBox4 {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            height: 250px;
            width: 250px;
            border: 1px solid #aaaaaa;
            padding: 1rem;
            }
            
            img {
            height: 200px;
            object-fit: cover;
            }
            
            #tobacoForm {
            display: none;
            }
        </style>
        
        <script src="https://bernardo-castilho.github.io/DragDropTouch/DragDropTouch.js"> </script>
        <script>
            function allowDrop(event) {
                event.preventDefault();
            }
    
            function drag(event) {
                event.dataTransfer.setData("text", event.target.id);
            }
    
            function drop(event) {
                event.preventDefault();
                var data = event.dataTransfer.getData("text");
                event.target.appendChild(document.getElementById(data));
                document.getElementById("pipe").src = "https://i.ibb.co/XXbcyhD/pipe-lit.png";
                setTimeout(() => {
                    document.getElementById("tobacoDone").click();
                }, 2500);
            }
    
            document.getElementById("dropBox1").ondrop = event => drop(event);
            document.getElementById("dropBox1").ondragover = event => allowDrop(event);
            document.getElementById("pipe").ondrop = event => drop(event);
            document.getElementById("pipe").ondragover = event => allowDrop(event);        
            document.getElementById("four-twenty").ondragstart = event => drag(event);
        </script>`,
            example: {}
        }
    }

    constructor() {
        super();
        this.registerSafeEventListeners('tobacoDone', this.handleTobacoEvent, isTobacoEvent);
    }

    componentStartEvent() {
        const [, setState] = this.useState();
        Parkmyst.subscribeToEvent('tobacoDone');
        setState({
            feedId: Parkmyst.createFeed('tobacoTemplate',
                {},
                Parkmyst.PlayerPermission.User
            )
        })
    }

    componentCleanUp() {
        Parkmyst.unsubscribeFromEvent('tobacoDone');
        const [state] = this.useState();
        Parkmyst.removeFeed(state.feedId);
        Parkmyst.useState()[1]({});
    }

    componentCompleted() {
        const information = this.getInformation();
        Parkmyst.dispatchNextComponentEvent(information.nextComponents);
    }

    handleTobacoEvent(event: TobacoEvent) {
        Parkmyst.dispatchCompleted();
    }

}


Parkmyst.registerComponent(new TobacoComponent());