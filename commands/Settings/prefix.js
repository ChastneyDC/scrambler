const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "prefix",
            runIn: ["text"],
            permissionLevel: 5,
            cooldown: 3,
            aliases: [],
            usage: "[reset|Prefix:string]",
            usageDelim: " ",
            description: "Sets a custom prefix for Scrambler.",
            category: "Config"
        });
    }

    async run(message, [...params]) {
        const reset = params[0] === "reset";
        if (params[0]) {
            await message.guild.settings.update("prefix", reset ? "s!" : params[0]);
            return message.send(`Successfully ${reset ? "reset" : "updated"} your prefix to \`${message.guild.settings.prefix}\``);
        } else {
            return message.send(`Your prefix is \`${message.guild.settings.prefix}\`. To change it, use \`${message.guild.settings.prefix}help prefix\`.`);
        }
    }
};
