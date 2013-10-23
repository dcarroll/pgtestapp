
/*
 * GET home page.
 */

exports.index = function(req, res){
	pgclient.query('SELECT * FROM products', function(err, result) {
    	done();
    	if(err) return console.error(err);
    	console.log(result.rows);
		res.render('index', { title: 'Express', products: result.rows });
  });
};