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
};

gameScene.preload = function()
{
    this.load.image('follow',"assets/FollowButton.png");
    this.load.image('anon',"assets/Anonymous.jpg");
    this.load.image('tweetBG',"assets/Blank.png");
    //['like','retweet','reply','mute','report']

    this.load.image('like', "assets/like.jpeg");

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
    this.followButton = new Button(this,50,config.height-175,'follow',()=>{gameScene.addFollowers(1)});
    this.followButton.setInteractive();
    this.followButton.on('pointerdown',()=>{gameScene.addFollowers(1);gameScene.tweetWall.addTweet("Test",this);});
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
    this.controlPanel.popularityLabel = this.add.text(10,config.height-75,this.popularityScore,{fill:"#000"});
    this.controlPanel.followerLabel = this.add.text(10,config.height-25,this.followCount,{fill:"#000"});
    this.controlPanel.add(this.controlPanel.popularityLabel);
    this.controlPanel.add(this.controlPanel.followerLabel);
};
gameScene.fillTweetWall = function()
{
    //List of all tweet sprites currently on the wall
    this.tweetWall.currentTweets = [];

    //Function for adding a tweet
    this.tweetWall.addTweet = function(text,scene)
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
                this.currentTweets.shift();
                tweet.destroy();
                i--;
            }
            else
                tweet.y += tweetHeight+10;
        }
        //Make the new box
        let newTweet = scene.add.container(scene.windowPos[1][0]+10,scene.windowPos[1][1]+10);
        newTweet.add(scene.add.sprite(tweetLength/2,tweetHeight/2,'tweetBG'));
        let likeButton = scene.add.sprite(100,100,'like');
        likeButton.setScale(.2);
        newTweet.add(likeButton);


        let anon = scene.add.sprite(25,25,'anon');
        anon.setScale(.1171875);
        newTweet.add(anon);
        newTweet.add(scene.add.text(50,15,generateName(),{fill:"#000"}));
        newTweet.add(scene.add.text(30,50,text,{fill:"#000"}));
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
