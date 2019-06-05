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

    this.load.image('up arrow', "assets/up arrow.png");
    this.load.image('arrow', "assets/arrow.png");
    this.load.image('down arrow', "assets/down arrow.png");
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

        }
        else
        {

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
    this.controlPanel.topicLabel = this.add.text(60,config.height-250,"Donald Trump",{fill:"#000"});
    this.controlPanel.tweetAggressionLabel = this.add.text(35, config.height-375, this.tweetAggression, {fill: "#000"});
    this.controlPanel.tweetAggressionLabel.setScale(6);
    this.controlPanel.tweetInstructions = this.add.text(30, config.height-450, "-5 = most liberal\n 0 = moderate\n 5 = most conservative", {fill: "#000"});
    this.controlPanel.popularityLabel = this.add.text(10,config.height-75,this.popularityScore,{fill:"#000"});
    this.controlPanel.followerLabel = this.add.text(10,config.height-25,this.followCount,{fill:"#000"});
    this.controlPanel.add(this.controlPanel.popularityLabel);
    this.controlPanel.add(this.controlPanel.followerLabel);
    //Buttons
    this.followButton = new Button(this,125,config.height-155,'follow',()=>{gameScene.addFollowers(1);gameScene.tweetWall.addTweet("You",generateTweet(this.tweetAggression),gameScene);});
    // this.followButton = new Button(this,125,config.height-137,'follow',()=>{gameScene.addFollowers(1);gameScene.eventWindow.addEvent(this.followCount,10000,true)});
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
    this.tweetWall.addTweet = function(name,text,scene)
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
        makeInteractive(rtButton);
        makeInteractive(likeButton);
        makeInteractive(replyButton);
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
};

gameScene.addFollowers = function(num)
{
    this.followCount += num;
    this.controlPanel.followerLabel.setText(this.followCount);
};

gameScene.changePopularity = function(num)
{
    this.popularityScore += num;
    this.controlPanel.popularityLabel.setText(this.popularityScore);
};


function makeInteractive(item){
    item.setInteractive();
    item.on('pointerdown',()=>{gameScene.changePopularity(1);});
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
  this.topicNumber += 1;
  if (this.topicNumber%2 === 1){
    this.controlPanel.topicLabel.setText("abortion");
  }
  else{
    this.controlPanel.topicLabel.setText("Donald Trump")
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
