'use strict';
var gulp = require('gulp');
var  watch = require('gulp-watch');
var git = require('gulp-git');
var gutil = require('gulp-util');
var hasChange='';
var path=require('path')
var swapPath='//192.168.2.254/dev/sharedCacheFile/'+path.dirname(__filename).split(path.sep).pop();
var watchPath='//192.168.2.254/dev/sharedCacheFile/'+path.dirname(__filename).split(path.sep).pop()+'/*';
console.log(watchPath)
//git init task
gulp.task('init', function(){
  git.init(function (err) {
    if (err) throw err;
  })
});

//Intranet watch
gulp.task('preO', function(){
    watch(watchPath, function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
    });
//copy files to the Intranet

gulp.task('addC',['status'],function(cb){
  gutil.log(gutil.colors.green(hasChange||'no change'))
 
  if(hasChange){
     return  gulp.src('./')
    .pipe(git.add())
    .pipe(git.commit(hasChange.split('\n')));
  }else{
    cb();
  }
 
   
  })

gulp.task('status',function(cb){
  git.status({args: '--porcelain'}, function (err, stdout) {
   
    if (err) throw err;
    hasChange=stdout?stdout:'';
     cb();
   
  })
  })

gulp.task('preI',['addC'],function(){
    console.log(1);
  });

