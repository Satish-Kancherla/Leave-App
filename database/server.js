const express = require ("express");
const app= express();
const  mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  user            : 'root',
  host            : 'localhost',
  password        : '',
  database        : 'employee'
});

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.post('/emp',(req,res)=>{
  const sql="INSERT INTO leaverequest (`employeename`,`projectname`,`shifttimings`,`leavetype`,`startdate`,`enddate`,`numberofdays`,`description`,`managername`) Values(?)";

  const values = [req.body.employeename, req.body.projectname, req.body.shifttimings,req.body.leavetype, req.body.startdate, req.body.enddate, req.body.numberofdays, req.body.description, req.body.managername]

  db.query(sql,[ values],(err,data)=>{
      if(err)
      return res.json(data);
  })
})

app.get("/users",(req,res)=>{
    db.query("SELECT * FROM leaverequest",(err,result)=>{
        if(err){
            console.log(err);
            return result.json(err);
        } else {
            res.send(result);
          }
    })
})


app.get("/userdetails/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM leaverequest WHERE id = ?",id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
   

  app.put("/users/:id", (req, res) => {
    const userId = req.params.id;

    const sql ="UPDATE leaverequest SET status = ? WHERE id = ?";

    db.query(sql, [req.body.status,userId], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

  app.post('/details/:id',(req,res)=>{
    const sql="INSERT INTO leaverequest(`id`,`employeename`,`projectname`,`shifttimings`,`leavetype`,`startdate`,`enddate`,`numberofdays`,`description`,`managername`,`status`) Values(?)";

    const values = [req.body.id, req.body.employeename, req.body.projectname, req.body.shifttimings,req.body.leavetype,req.body.startdate, req.body.enddate, req.body.numberofdays, req.body.description, req.body.managername,req.body.status]

    db.query(sql,[ values],(err,data)=>{
        if(err)
        return res.json(data);
    })
})

app.listen(8083,()=>{
    console.log("Listening on port number 8083");
})
