import app from './app';

const main = ()=>{
    app.listen(app.get('port'));
    console.log(`server run in port 3000`);
};

main();