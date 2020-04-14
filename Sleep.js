class Sleep {
    constructor(timeout) {
        this.timeout =timeout;
    }
    then(resolve,reject){
        let startTime=Date.now();
        setTimeout(
            ()=>resolve(Date.now()-startTime),
            this.timeout
        );
    }
}
module.exports=Sleep;