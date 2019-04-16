//
// Command: help
//
module.exports = function (controller) {

    controller.hears([/^help$/], 'direct_message,direct_mention', function (bot, message) {
        var text = "Here are my  Medical skills:";
        text += "\n- " + bot.appendMention(message, "INJECT") + ": Entr amount of Insulin to DB";
        text += "\n- " + bot.appendMention(message, "MEAL") + ": Enter amount of Carbs to DB";
        text += "\n- " + bot.appendMention(message, "BG") + ": see current Sugar Level";
        text += "\n- " + bot.appendMention(message, "REPORT") + ": see last to Days of BG Levels";
        text += "\n\nI also understand some Demo Functions:";
        text += "\n- " + bot.appendMention(message, "NASA") + ": see NASA Image of the DAY";
        text += "\n- " + bot.appendMention(message, "NASAURL") + ": see NASA Image of the DAY unincluding link";
        text += "\n- " + bot.appendMention(message, "color") + ": ask to pick a random color";
        text += "\n- " + bot.appendMention(message, "loop") + ": example of a menu that loops until explicitly stopped";
        text += "\n- " + bot.appendMention(message, "menu") + ": implement a menu via a conversation";
        text += "\n- " + bot.appendMention(message, "quiz") + ": multi-threaded conversation with timeout";
        text += "\n- " + bot.appendMention(message, "restricted") + ": let a user pick a color among a set of options";
        text += "\n- " + bot.appendMention(message, "storage") + ": store picked color as a user preference";
        text += "\n- " + bot.appendMention(message, "threads") + ": branch to another thread";
        text += "\n- " + bot.appendMention(message, "variables") + ": enriched user-context among threads";
        text += "\n- " + bot.appendMention(message, "about") + ": shows metadata about myself";
        text += "\n- " + bot.appendMention(message, "help") + ": spreads the word about my skills";
        text += "\n- " + bot.appendMention(message, "show [skill]") + ": display the code of the specified skill";
        bot.reply(message, text);
    });
}
