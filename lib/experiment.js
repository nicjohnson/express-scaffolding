
/*
 * Look for experiment param
 */

exports.check = function (req, res, next) {
  res.locals = {
    exp: function (toCheck) {
      if (req.query.exp) {
        var experiments = req.query.exp.split(',');
        if(experiments.indexOf(toCheck) != '-1') {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };
  next();
}