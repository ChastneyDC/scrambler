const { Command, Usage, TextPrompt } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "delete",
            runIn: ["text"],
            permissionLevel: 5,
            cooldown: 3,
            aliases: [],
            usage: "<user:user|id:uid> [event:name] [...]",
            usageDelim: " ",
            description: "Manages users' times in the server competition.",
            extendedHelp: "https://docs.scramblr.app/docs/comps/manage"
        });
    }

    async run(message, [user, ...params]) {
        const settings = message.guild.settings;
        if (settings.comp.enabled) {
            if (settings.comp.active) {
                user = user.id ? user : message.guild.members.cache.get(user);
                if (user) {
                    if (params[0]) {
                        let usage = new Usage(this.client, "<y|n>", " ");
                        let prompt = new TextPrompt(message, usage, { time: 15000, limit: 2 }).run(`Are you sure you want to delete entries from ${user.username}#${user.discriminator} (ID: ${user.id})? **Y**/n`);
                        prompt.then(async response => {
                            if (response[0].toLowerCase().includes("y")) {
                                for (let i = 0; i < params.length; i++) {
                                    if (params[i]) {
                                        let results = settings.get(`comp.events.${params[i]}.results`);
                                        let userTimes = results.filter(n => n.user.id == user.id);
                                        if (userTimes[0]) {
                                            await settings.update(`comp.events.${params[i]}.results`, userTimes[0]);
                                            return message.send("Deleted!");
                                        } else {
                                            return message.send("No time found for this user!");
                                        }
                                    }
                                }
                            }
                        });
                    } else
                        return message.send("Please provide a valid event.");
                } else
                    return message.send("Please mention a valid user or provide a valid user ID.");
            } else
                return message.send("There isn't an active competition on this server.");
        } else
            return message.send("Competitions are not enabled on this server. To enable them, run \`s!config enable\`");
    }
};
