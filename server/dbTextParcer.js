import Monster from "./classes/Monster.js";

function textParcer(id, source, monster) {
    //let monster = new Monster();
    return {
        id: id,
        source: source,
        text: monster
    };
}


export default textParcer;