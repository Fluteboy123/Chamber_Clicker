let gameScene = new Phaser.Scene('Game');
const config = {
    type: Phaser.AUTO,
    height:500,
    width:1000,
    scene:gameScene,
    audio:{
        disableWebAudio: true
    }
};
let game = new Phaser.Game(config);

gameScene.init = function()
{
    this.followCount = 0;
    this.popularityScore = 0;
    this.botCount = 0;
    this.topicNumber = 0;
    this.tweetAggression = 0;
};

gameScene.preload = function()
{
    this.load.image('follow',"assets/FollowButton.png");
    this.load.image('anon',"assets/Anonymous.jpg");
    this.load.image('tweetBG',"assets/Blank.png");
    this.load.image('like',"assets/Like.png");
    this.load.image('retweet',"assets/Retweet.png");
    this.load.image('reply',"assets/Reply.jpg");
    this.load.image('bot',"assets/Bot.png");
    this.load.image('bot2',"assets/Bot2.png");
    this.load.image('up arrow', "assets/up arrow.png");
    this.load.image('arrow', "assets/arrow.png");
    this.load.image('down arrow', "assets/down arrow.png");
    this.load.image('tweet', "assets/tweet.jpg");
    //['like','retweet','reply','mute','report']
};

gameScene.create = function()
{
    //Positions and colors of the panels
    this.windowPos = [[0,0],[250,0],[750,0],[750,300]];
    this.windowColors = [0x88ffff,0xccffff,0xf0f0f0];

    //Graphics
    this.fillBackground();
    this.controlPanel = this.add.container(this.windowPos[0][0],this.windowPos[0][1]);
    this.tweetWall = this.add.container(this.windowPos[1][0],this.windowPos[1][1]);
    this.upgrades = this.add.container(this.windowPos[2][0],this.windowPos[2][1]);
    this.eventWindow = this.add.container(this.windowPos[3][0],this.windowPos[3][1]);
    this.fillControlPanel();
    this.fillTweetWall();
    this.fillUpgrades();
    this.fillEvents();

    //gives followers based on amount of bots owned
    botTimer = this.time.addEvent({delay: 5000,callback: botFollow, callbackScope: this, loop: true});


    //Buttons
};

gameScene.update = function(time,delta)
{
    //Update the event progress
    if(this.eventWindow.timer>0)
    {
        this.eventWindow.timer-=delta;
        if(this.eventWindow.timer>0)
        {
            this.backGraphics.fillStyle(0x444444);
            this.backGraphics.fillRect(gameScene.windowPos[3][0]+25,gameScene.windowPos[3][1]+150,200,25);
            this.backGraphics.fillStyle(0xbb0000);
            this.backGraphics.fillRect(gameScene.windowPos[3][0]+25,gameScene.windowPos[3][1]+150,200*this.eventWindow.timer/this.eventWindow.startTime,25);
        }
        else
        {
            this.eventWindow.deleteCurrentEvent();
            if(this.eventWindow.queue.length>0)
                this.eventWindow.displayNextEvent();
        }
    }
};

gameScene.fillBackground = function()
{
    this.backGraphics = this.add.graphics({ fillStyle: { color: this.windowColors[0] } });
    this.backGraphics.fillRectShape(new Phaser.Geom.Rectangle(this.windowPos[0][0],this.windowPos[0][1],this.windowPos[1][0]-this.windowPos[0][0],500));
    this.backGraphics.fillRectShape(new Phaser.Geom.Rectangle(this.windowPos[2][0],this.windowPos[2][1],config.width-this.windowPos[2][0],this.windowPos[3][1]-this.windowPos[2][1]));
    this.backGraphics.fillStyle(this.windowColors[1]);
    this.backGraphics.fillRectShape(new Phaser.Geom.Rectangle(this.windowPos[1][0],this.windowPos[1][1],this.windowPos[2][0]-this.windowPos[1][0],500));
    this.backGraphics.fillStyle(this.windowColors[2]);
    this.backGraphics.fillRectShape(new Phaser.Geom.Rectangle(this.windowPos[3][0],this.windowPos[3][1],config.width-this.windowPos[2][0],config.height-this.windowPos[3][1]));
};

gameScene.fillControlPanel = function()
{
    //Text boxes
    this.controlPanel.add(this.add.text(10,10,"Tweet",{fill:"#000"}));
    this.controlPanel.add(this.add.text(10,config.height-100,"Popularity",{fill:"#000"}));
    this.controlPanel.add(this.add.text(10,config.height-50,"Followers",{fill:"#000"}));


    //Text boxes that hold the game scores in them
    this.controlPanel.topicLabel = this.add.text(60,config.height-250,"abortion",{fill:"#000"});
    this.controlPanel.tweetAggressionLabel = this.add.text(35, config.height-375, this.tweetAggression, {fill: "#000"});
    this.controlPanel.tweetAggressionLabel.setScale(6);
    this.controlPanel.tweetInstructions = this.add.text(30, config.height-450, "5 = most conservative \n0 = moderate \n-5 = most liberal", {fill: "#000"});
    this.controlPanel.popularityLabel = this.add.text(10,config.height-75,this.popularityScore,{fill:"#000"});
    this.controlPanel.followerLabel = this.add.text(10,config.height-25,this.followCount,{fill:"#000"});
    this.controlPanel.add(this.controlPanel.popularityLabel);
    this.controlPanel.add(this.controlPanel.followerLabel);
    //Buttons
    this.followButton = new Button(this,180,config.height-60,'follow',()=>{gameScene.addFollowers(1),gameScene;});
    this.followButton.setScale(.8);
    // this.followButton = new Button(this,125,config.height-137,'follow',()=>{gameScene.addFollowers(1);gameScene.eventWindow.addEvent(this.followCount,10000,true)});
    this.tweetButton = new Button(this, 125, config.height-165, 'tweet', ()=>{gameScene.tweetWall.addTweet("You",generateTweet(this.tweetAggression, this.topicNumber), this.tweetAggression, gameScene);});
    this.tweetButton.setScale(.2);
    this.topicToggle = new Button(this, 125, config.height-225, 'arrow', ()=>{gameScene.changeTopic();});
    this.upButton = new Button(this, 160, config.height - 370, 'up arrow', ()=>{gameScene.increment();});
    this.downButton = new Button(this, 160, config.height - 300, 'down arrow', ()=>{gameScene.decrement()});
    this.upButton.setScale(.1);
    this.downButton.setScale(.15);
    this.topicToggle.setScale(.25);
    this.controlPanel.add(this.followButton);
};
gameScene.fillTweetWall = function()
{
    //List of all tweet sprites currently on the wall
    this.tweetWall.currentTweets = [];

    //Function for adding a tweet
    this.tweetWall.addTweet = function(name,text,intensity,scene)
    {
        //Dimensions of the box
        const tweetHeight = 150, tweetLength = scene.windowPos[2][0] - scene.windowPos[1][0] - 20;
        //For every current container on the panel
        for(let i=0;i<this.currentTweets.length;i++)
        {
            let tweet = this.currentTweets[i];
            //If the box will end up off of the screen
            if(tweet.y + tweetHeight+10>=config.height)
            {
                const wall = this;
                scene.tweens.add({
                    targets:tweet,
                    duration:100,
                    y:tweet.y+tweetHeight+10,
                    onComplete: function()
                    {
                        wall.currentTweets.shift();
                        tweet.destroy();
                        i--;
                    }
                });
            }
            else
            {
                scene.tweens.add({
                    targets:tweet,
                    duration:100,
                    y:tweet.y+tweetHeight+10
                });
            }
        }
        //Make the new box
        let newTweet = scene.add.container(scene.windowPos[1][0]+10,scene.windowPos[1][1]+10);
        let wall = scene.add.sprite(tweetLength/2,tweetHeight/2,'tweetBG');
      //  wall.setScale(4.8,1.5);
        newTweet.add(wall);
        let anon = scene.add.sprite(25,25,'anon');
        anon.setScale(.1171875);
        let likeButton = scene.add.sprite(50,120,'like');
        let rtButton = scene.add.sprite(240,120,'retweet');
        let replyButton = scene.add.sprite(420,120,'reply');
        makeInteractive(rtButton, intensity);
        makeInteractive(likeButton, intensity);
        makeInteractive(replyButton, intensity);
        newTweet.add(replyButton);
        newTweet.add(rtButton);
        newTweet.add(likeButton);
        newTweet.add(anon);
        newTweet.add(scene.add.text(50,15,name,{fill:"#000"}));
        newTweet.add(scene.add.text(30,50,text,{fill:"#000"}));
        scene.tweens.add({
            targets:newTweet,
            duration:100,
            onStart:function()
            {
                newTweet.setScale(0);
            },
            scaleX:1,
            scaleY:1
        });
        this.currentTweets.push(newTweet);
    };
};
gameScene.fillUpgrades = function()
{
    this.upgrades.add(this.add.text(10,10,"Upgrades",{fill:"#000"}));
    this.upgrades.add(this.add.text(10,120,"Cost: 20 Popularity",{fill:"#000"}));
    this.upgrades.botLabel = this.add.text(125,70,this.botCount,{fill:"#000"});
    this.upgrades.add(this.upgrades.botLabel);

    //Bot Logo Logic
    let botLogo = this.add.sprite(50,75,'bot');
    this.upgrades.add(botLogo);
    botLogo.setInteractive();
    botLogo.on('pointerover',() => botLogo.setTexture('bot2'));
    botLogo.on('pointerout',() => botLogo.setTexture('bot'));
    botLogo.on('pointerdown', () => this.addBots(1));

};
gameScene.fillEvents = function()
{
    /*startTime and timer represent time in milliseconds
    *startTime represents how much time the player was given to respond to an event before it disappears
    * timer represents how much time is left. If timer is negative or zero, there is no current event.
    * When one event ends, the next event in the queue will run
    */
    this.eventWindow.startTime = 10000;
    this.eventWindow.timer = 0;
    this.eventWindow.queue = [];

    //Add an event to the queue, and auto-display it if nothing else is currently playing
    gameScene.eventWindow.addEvent = function(text,time,onYourSide)
    {
        this.queue.push({
            text:text,
            time:time,
            onYourSide:onYourSide
        });
        if(this.queue.length === 1)
            this.displayNextEvent();
    };
    //Display the next event. The assumption is the previous event has already been cleared
    gameScene.eventWindow.displayNextEvent = function()
    {
        this.add(gameScene.add.text(10,10,this.queue[0].text,{fill:"#000"}));
        this.startTime = this.queue[0].time;
        this.timer = this.queue[0].time;
        gameScene.backGraphics.fillStyle(0xbb0000);
        gameScene.backGraphics.fillRect(gameScene.windowPos[3][0]+25,gameScene.windowPos[3][1]+150,200,25);
    };
    //Clears the current event, but doesn't play the next event
    gameScene.eventWindow.deleteCurrentEvent = function()
    {
        this.removeAll();
        this.queue.shift();
        gameScene.backGraphics.fillStyle(gameScene.windowColors[2]);
        gameScene.backGraphics.fillRect(gameScene.windowPos[3][0]+25,gameScene.windowPos[3][1]+150,200,25);
    };
};

gameScene.addFollowers = function(num)
{
    this.followCount += num;
    this.controlPanel.followerLabel.setText(this.followCount);
};

gameScene.addBots = function(num)
{
  if(this.popularityScore > 19){
    this.popularityScore -= 20;
    this.controlPanel.popularityLabel.setText(this.popularityScore);
    this.botCount += num;
    this.upgrades.botLabel.setText(this.botCount);
  }

};

gameScene.changePopularity = function(num)
{
    this.popularityScore += num;
    this.controlPanel.popularityLabel.setText(this.popularityScore);
};


function makeInteractive(item, num){
    item.setInteractive();
    item.on('pointerdown',()=>{gameScene.changePopularity(Math.abs(num)+1);});
    item.on('pointerdown', function(pointer){
        resetItemState(item);
        item.onClickTween = gameScene.tweens.add({
            targets: item,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 100,
            yoyo: true,
            ease: 'Quad.easeIn',
            onStart: function(){
                item.setScale(1, 1);
            }
        });
    });

}

function resetItemState(item){

    if(item.onClickTween){
        item.onClickTween.remove();
    }

}

gameScene.changeTopic = function(){
  if (this.topicNumber < 2){
    this.topicNumber += 1;
  }
  else {
    this.topicNumber = 0;
  }
  if (this.topicNumber === 0){
    this.controlPanel.topicLabel.setText("abortion");
  }
  else if (this.topicNumber === 1){
    this.controlPanel.topicLabel.setText("Donald Trump");
  }
  else if (this.topicNumber === 2){
    this.controlPanel.topicLabel.setText("climate change");
  }
};

gameScene.increment = function(){
  if (this.tweetAggression < 5){
    this.tweetAggression += 1;
    this.controlPanel.tweetAggressionLabel.setText(this.tweetAggression);
  }
};

gameScene.decrement = function(){
  if (this.tweetAggression > -5){
    this.tweetAggression -= 1;
    this.controlPanel.tweetAggressionLabel.setText(this.tweetAggression);
  }
};

function botFollow(){
  this.followCount = this.followCount + this.botCount;
  this.controlPanel.followerLabel.setText(this.followCount);
}
