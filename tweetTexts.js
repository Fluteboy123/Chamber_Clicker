//Store various tweets in arrays, ordered by intensity (-5 to 5)
function generateTweet(num, topic){
  var tweets = [];
  if (topic === 0){
    //Abortion tweets
    tweets =
["Right to lifers are hypocritical moral cowards\n and we’ll all be better off when they’re dead",
"Republicans will defend you until you’re born,\n but after that don’t expect any handouts",
"Men shouldn’t even be allowed to talk about\n abortions, it’s not their problem",
"I just don’t understand how people prioritize\n fetuses over their LIVING MOTHERS",
"People have the right to decide what to do with\ntheir own bodies",
"*cute dog picture because a rational person\ndoesn’t tweet about abortion*",
"People should be allowed abortions in cases of\nrape or incest, but doing it whenever they want\nis such a slippery slope",
"I can’t believe that liberals are so okay with \nending an innocent potential life",
"This fight for abortion shows how far the \nAmerican moral compass has degenerated",
"Feminazis and libtards need to get it through \ntheir thick skulls that they have no right to \nplay God",
"Abortion is the biggest genocide in the history\n of the Earth, MUCH WORSE THAN THE HOLOCAUST" ]
  }
  else if (topic === 1){
    //Trump tweets
    tweets =
["You better watch your fucking ass Trump, I \nbought a gun and I’m coming for your head.",
"Every day a predatorial, sociopathic, dumbass \npig is our president, I get closer to moving \nto Canada.",
"I think that it’s ridiculous that the Mueller \nreport is still unavailable to the public!",
"#AnyoneButTrump2020",
"Is anyone else concerned that the President has \ndementia?",
"I’m so sick of all of the posts about Trump, \njust move on already.",
"I don’t know why those Brits are so ungrateful, \nTrump is doing a good job.",
"Just donated to the Border Wall GoFundMe!",
"Can’t believe that they’re still trying to \nimpeach POTUS, he clearly did nothing wrong",
"Those snowflakes need to stop complaining and \nfinally see how much better our country is now",
"Thank GOD WE HAVE a BUSINESS MAN SAVING OUR \nCOUNTRY. OBAMA’S A MONKEY, HILLARYS THE DEVIL, \nFUCK BERNIE #MAGA#MAGA"]
  }
  else if (topic === 2){
    //Climate change tweets
    tweets =
["If you haven’t already gone vegan, you might as \nwell kill yourself and fertilize the plants for \nthe rest of us",
"Our industrialist society is destroying our \nplanet #Socialism #KillBigBusiness",
"These senile climate deniers need to get out of \nthe way before they doom the rest of us",
"Phasing out plastic straws was a good start, \nbut it’s not enough!",
"We’re really falling behind other countries in \nsustainability",
"Recently, I’ve been biking to work to reduce my \ncarbon footprint",
"Climate change is a real issue, but it’s not \nnearly as important as national defense",
"AOC’s New Green Deal is a pile of bullshit",
"Thank God we’re not in the Paris Accord, that \nshitty deal was going to rob our country",
"They claim that a climate change of .5 degrees \nwould be bad. That happens every time the sun\nrises or sets. IDIOTS",
"Climate change is FAKE NEWS, Donald Trump won’t \nfall for your liberal bullshit" ]
  }
return tweets[num+5];
}

//Store all tweets together for random generation by CPU
function generateRandomTweet(rand){
  var tweets =
["Right to lifers are hypocritical moral cowards\n and we’ll all be better off when they’re dead",
"Republicans will defend you until you’re born,\n but after that don’t expect any handouts",
"Men shouldn’t even be allowed to talk about\n abortions, it’s not their problem",
"I just don’t understand how people prioritize\n fetuses over their LIVING MOTHERS",
"People have the right to decide what to do with\ntheir own bodies",
"*cute dog picture because a rational person\ndoesn’t tweet about abortion*",
"People should be allowed abortions in cases of\nrape or incest, but doing it whenever they want\nis such a slippery slope",
"I can’t believe that liberals are so okay with \nending an innocent potential life",
"This fight for abortion shows how far the \nAmerican moral compass has degenerated",
"Feminazis and libtards need to get it through \ntheir thick skulls that they have no right to \nplay God",
"Abortion is the biggest genocide in the history\n of the Earth, MUCH WORSE THAN THE HOLOCAUST", "You better watch your fucking ass Trump, I \nbought a gun and I’m coming for your head.",
"Every day a predatorial, sociopathic, dumbass \npig is our president, I get closer to moving \nto Canada.",
"I think that it’s ridiculous that the Mueller \nreport is still unavailable to the public!",
"#AnyoneButTrump2020",
"Is anyone else concerned that the President has \ndementia?",
"I’m so sick of all of the posts about Trump, \njust move on already.",
"I don’t know why those Brits are so ungrateful, \nTrump is doing a good job.",
"Just donated to the Border Wall GoFundMe!",
"Can’t believe that they’re still trying to \nimpeach POTUS, he clearly did nothing wrong",
"Those snowflakes need to stop complaining and \nfinally see how much better our country is now",
"Thank GOD WE HAVE a BUSINESS MAN SAVING OUR \nCOUNTRY. OBAMA’S A MONKEY, HILLARYS THE DEVIL, \nFUCK BERNIE #MAGA#MAGA", "If you haven’t already gone vegan, you might as \nwell kill yourself and fertilize the plants for \nthe rest of us",
"Our industrialist society is destroying our \nplanet #Socialism #KillBigBusiness",
"These senile climate deniers need to get out of \nthe way before they doom the rest of us",
"Phasing out plastic straws was a good start, \nbut it’s not enough!",
"We’re really falling behind other countries in \nsustainability",
"Recently, I’ve been biking to work to reduce my \ncarbon footprint",
"Climate change is a real issue, but it’s not \nnearly as important as national defense",
"AOC’s New Green Deal is a pile of bullshit",
"Thank God we’re not in the Paris Accord, that \nshitty deal was going to rob our country",
"They claim that a climate change of .5 degrees \nwould be bad. That happens every time the sun\nrises or sets. IDIOTS",
"Climate change is FAKE NEWS, Donald Trump won’t \nfall for your liberal bullshit"]

//Randomly choose a tweet for printing
return tweets[Math.floor(Math.random()*32)];
}
