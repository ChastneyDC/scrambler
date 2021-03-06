const { Command, version: klasaVersion, Duration } = require("klasa");
const { version: discordVersion, MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            guarded: true,
            description: language => language.get("COMMAND_STATS_DESCRIPTION")
        });
    }

    async run(message) {
        let [users, guilds, channels, memory] = [0, 0, 0, 0];

        // if (this.client.shard) {
        //     const results = await this.client.shard.broadcastEval(`[this.users.cache.size, this.guilds.cache.size, this.channels.cache.size, (process.memoryUsage().heapUsed / 1024 / 1024)]`);
        //     for (const result of results) {
        //         users += result[0];
        //         guilds += result[1];
        //         channels += result[2];
        //         memory += result[3];
        //     }
        // }

        return message.send(new MessageEmbed()
            .setTitle("Bot Stats")
            .addField("Memory", `${(memory || process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("Uptime", Duration.toNow(Date.now() - (process.uptime() * 1000)), true)
            .addField("Users", (users || this.client.users.cache.size).toLocaleString(), true)
            .addField("Guilds", (guilds || this.client.guilds.cache.size).toLocaleString(), true)
            .addField("Channels", (channels || this.client.channels.cache.size).toLocaleString(), true)
            .addField("Klasa", klasaVersion, true)
            .addField("Discord.js", discordVersion, true)
            .addField("Node.js", process.version, true)
            .setFooter(`Scrambler`, this.client.user.displayAvatarURL())
            .setColor("RANDOM")
            .setTimestamp());
    }
};
