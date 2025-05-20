import SubCliteListener from "./generated/SubCliteListener.js";

export class CustomSubCliteListener extends SubCliteListener {

    enterStat(ctx) {
        console.log(`Se detectó una: ${ctx.constructor.name}`);
    }

}
