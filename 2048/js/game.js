//键盘按下
$(document).keydown(function(event){	//event是keydown事件自带的
	switch(event.keyCode) {
		case 37://left
			/*
			moveleft()方法
				完成想左移动的逻辑
				返回值是Boolean类型，判断是否可以向左移
			*/
			if(moveLeft()){
				//重新随机生成两个数
				// generateOneNumber();
				//判断当这次移动完成之后是否游戏结束
				// isgameover();
				setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
			}
			break;
		case 38://up
			if(moveUp()){
				//重新随机生成两个数
				// generateOneNumber();
				//判断当这次移动完成之后是否游戏结束
				// isgameover();
				setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
			}
			break;
		case 39://right
			if(moveRight()){
				//重新随机生成两个数
				// generateOneNumber();
				//判断当这次移动完成之后是否游戏结束
				// isgameover();
				setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
			}
			break;
		case 40://down
			if(moveDown()){
				//重新随机生成两个数
				// generateOneNumber();
				//判断当这次移动完成之后是否游戏结束
				// isgameover();
				setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
			}
			break;
	}
});
// 按键
$(document).ready(function(){
	var mykey = $('.mykey');
	mykey.each(function(key, value){
		$(value).bind('click', function(){
			switch(this.id) {
				case 'myUpKey':
					if(moveUp()){
						setTimeout("generateOneNumber()", 210);
		                setTimeout("isgameover()", 300);
					}
					break;
				case 'myDownKey':
					if(moveDown()){
						setTimeout("generateOneNumber()", 210);
		                setTimeout("isgameover()", 300);
					}
					break;
				case 'myLeftKey':
					if(moveLeft()){
						setTimeout("generateOneNumber()", 210);
		                setTimeout("isgameover()", 300);
					}
					break;
				case 'myRightKey':
					if(moveRight()){
						setTimeout("generateOneNumber()", 210);
		                setTimeout("isgameover()", 300);
					}
					break;
			}
		})
	});
});


function moveLeft(){
	//返回值是Boolean类型，判断是否可以向左移
	if(!canMoveLeft(board)){
		//当前格子不能移动
		return false;
	}
	//完成向左移动逻辑
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if(board[i][j] != 0){
				//向左移动的逻辑
				for (var k = 0; k < j; k++) {
					if(board[i][k] == 0 && noBlockHorizontalCol(i, k, j, board)){
						//才能左移动
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontalCol(i, k, j, board) && !hasConflicted[i][k]){
						//才能左移动
						//move
						showMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updateScore(score);
						// hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView();", 200);
	return true;
}
function moveUp(){
	//返回值是Boolean类型，判断是否可以向上移
	if(!canMoveUp(board)){
		//当前格子不能移动
		return false;
	}
	//完成向上移动逻辑
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if(board[j][i] != 0){
				//向上移动的逻辑
				for (var k = 0; k < j; k++) {
					if(board[k][i] == 0 && noBlockHorizontalRow(i, k, j, board)){
						//才能上移动
						showMoveAnimation(j, i, k, i);
						board[k][i] = board[j][i];
						board[j][i] = 0;
					}else if(board[k][i] == board[j][i] && noBlockHorizontalRow(i, k, j, board) && !hasConflicted[k][i]){
						//才能上移动
						//move
						showMoveAnimation(j, i, k, i);
						//add
						board[k][i] += board[j][i];
						board[j][i] = 0;
						//add score
						score += board[k][i];
						updateScore(score);
						hasConflicted[k][i] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView();", 200);
	return true;
}
function moveRight(){
	//返回值是Boolean类型，判断是否可以向右移
	if(!canMoveRight(board)){
		//当前格子不能移动
		return false;
	}
	//完成向右移动逻辑
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if(board[i][j] != 0){
				//向右移动的逻辑
				for (var k = 3; k > j; k--) {
					if(board[i][k] == 0 && noBlockHorizontalCol2(i, k, j, board)){
						//才能右移动
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontalCol2(i, k, j, board) && !hasConflicted[i][k]){
						//才能右移动
						//move
						showMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView();", 200);
	return true;
}
function moveDown(){
	//返回值是Boolean类型，判断是否可以向下移
	if(!canMoveDown(board)){
		//当前格子不能移动
		return false;
	}
	//完成向下移动逻辑
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if(board[j][i] != 0){
				//向下移动的逻辑
				for (var k = 3; k > j ; k--) {
					if(board[k][i] == 0 && noBlockHorizontalRow2(i, k, j, board)){
						//才能下移动
						showMoveAnimation(j, i, k, i);
						board[k][i] = board[j][i];
						board[j][i] = 0;
					}else if(board[k][i] == board[j][i] && noBlockHorizontalRow2(i, k, j, board) && !hasConflicted[k][i]){
						//才能下移动
						//move
						showMoveAnimation(j, i, k, i);
						//add
						board[k][i] += board[j][i];
						board[j][i] = 0;

						score += board[k][i];
						updateScore(score);
						hasConflicted[k][i] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView();", 200);
	return true;
}
function isgameover(){
	if(nospace(board) && nomove(board)){
		updateBoardView();
		gameover();
	}
}
function gameover(){
	alert("gameover!");
	$("#grid-container").append("<div id='gameover' class='gameover'><p>本次得分</p><span>"+score+"</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
	var gameover = $("#gameover");
	gameover.css("width", "500px");
	gameover.css("height", "500px");
	gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}
