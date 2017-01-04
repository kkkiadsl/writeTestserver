
module.exports = function(app, Write)
{
	
	app.get('/admin/stampinfo',function (req, res) {
			res.render('Adminstamp_info');	
	});
	app.get('/admin/stampreq',function (req, res) {
	
			res.render('Adminstamp_req');
		
	});
	app.get('/admin/write',function (req, res) {
		
			res.render('Adminstamp_write');
	});
	
	app.get('/api/writes', function(req, res){
		Write.find(function(err, writes){
			if(err) return res.status(500).send({error: 'database failure'});
			res.json(writes);
		})
	});
	app.get('/api/writes/:status', function(req, res){
		Write.findOne({status: req.params.book_status}, function(err, write){
			if(err) return res.status(500).json({error: err});
			if(!write) return res.status(404).json({error: 'write not found'});
			res.json(write);
		})
	});
	
	app.post('/api/writes', function(req, res){
		var write = new Write();
		write.title = req.body.title;
		write.contents = req.body.contents;
		write.status = req.body.status;
		write.published_date = new Date();
		
		write.save(function(err){
			if(err){
				console.error(err);	
				res.json({result: 0});
				return;
			}
			res.json({result: 1});
		});
	});
	app.put('/api/write/:write_id', function(req, res){
		Write.findById(req.params.write_id, function(err, write){
			if(err) return res.status(500).json({error: err});
			if(!write) return res.status(404).json({error: 'write not found'});
			
			if(req.body.title) write.title = req.body.title;
			if(req.body.contents) write.contents = req.body.contents;
			if(req.body.published_date) write.published_date = req.body.published_date;
			
			write.save(function(err){
				if(err) res.status(500).json({error: 'failed to update'});
				res.json({message: 'write updated'});
			})
		
		})
		
	});
	app.delete('/api/writes/:write_id', function(req, res){
		Write.remove({ _id: req.params.write_id}, function(err, output){
			if(err) return res.status(500).json({ error: "database failure"});
			res.status(204).end();
		})
	});
	
}