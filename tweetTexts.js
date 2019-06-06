function generateTweet(num, topic){
  var tweets = [];
  if (topic === 0){
    tweets = ["Right to lifers are hypocritical moral cowards and we’ll all be better off when they’re dead",
"Republicans will defend you until you’re born, but after that don’t expect any handouts",
"Men shouldn’t even be allowed to talk about abortions, it’s not their problem",
"I just don’t understand how people prioritize fetuses over their LIVING MOTHERS",
"People have the right to decide what to do with their own bodies",
"*cute dog picture because a rational person doesn’t tweet about abortion*",
"People should be allowed abortions in cases of rape or incest, but doing it whenever they want is such a slippery slope",
"I can’t believe that liberals are so okay with ending an innocent potential life",
"This fight for abortion shows how far the American moral compass has degenerated",
"Feminazis and libtards need to get it through their thick skulls that they have no right to play God",
"Abortion is the biggest genocide in the history\n of the Earth, MUCH WORSE THAN THE HOLOCAUST" ]
  }
  else if (topic === 1){
    tweets = ["You better watch your fucking ass Trump, I bought a gun and I’m coming for your head.",
"Every day a predatorial, sociopathic, dumbass pig is our president, I get closer to moving to Canada.",
"I think that it’s ridiculous that the Mueller report is still unavailable to the public!",
"#AnyoneButTrump2020",
"Is anyone else concerned that the President has dementia?",
"I’m so sick of all of the posts about Trump, just move on already.",
"I don’t know why those Brits are so ungrateful, Trump is doing a good job.",
"Just donated to the Border Wall GoFundMe!",
"Can’t believe that they’re still trying to impeach POTUS, he clearly did nothing wrong",
"Those libtards need to stop complaining and finally see how much better our country is now",
"Thank GOD WE HAVE a BUSINESS MAN SAVING OUR COUNTRY. OBAMA’S A MONKEY, HILLARYS THE DEVIL, FUCK BERNIE #MAGA#MAGA"]
  }
  else if (topic === 2){
    tweets = ["If you haven’t already gone vegan, you might as well kill yourself and fertilize the plants for the rest of us",
"Our industrialist society is destroying our planet #Socialism #KillBigBusiness",
"These senile climate deniers need to get out of the way before they doom the rest of us",
"Phasing out plastic straws was a good start, but it’s not enough!",
"We’re really falling behind other countries in sustainability",
"Recently, I’ve been biking to work to reduce my carbon footprint",
"Climate change is a real issue, but it’s not nearly as important as national defense",
"AOC’s New Green Deal is a pile of bullshit",
"Thank God we’re not in the Paris Accord, that shitty deal was going to rob our country",
"They claim that a climate change of .5 degrees \nwould be bad. That happens every time the sun\nrises or sets. IDIOTS",
"Climate change is FAKE NEWS, Donald Trump won’t fall for your liberal bullshit" ]
  }
return tweets[num+5];
}
