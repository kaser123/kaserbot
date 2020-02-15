const Discord = require('discord.js');
const client = new Discord.Client();
const { Token } = require('./lib/config.js'); 
const { promptMessage } = require("./lib/functions.js");

const prefix = '카서야 '


client.on('message', (message) => {
	
	let sender = message.author;
	
	if(message.author.bot) return;
	
	if(message.content.startsWith(prefix+"현재 시각")) {
		var d = new Date();
        var currentDate = d.getFullYear() + "년 " + ( d.getMonth() + 1 ) + "월 " + d.getDate() + "일";
        var currentTime = d.getHours() + "시 " + d.getMinutes() + "분 " + d.getSeconds() + "초";
		message.channel.send("현재 시간은 "+currentDate+" "+currentTime+"입니다!")
	}
	
	if(message.content.startsWith(prefix+"놀자")) {
		
		const exampleEmbed = new Discord.RichEmbed()
	.setColor('#FE3523')
	.setDescription('아래 문제 풀어서 개발자한테 답 전해줘요 ^^')
	.setImage('https://lh3.googleusercontent.com/proxy/J2fC8s5EXw-rDy__wWYNUYz7b7X6EY6uVO-IAbAnm_9CIBNgg5iItYJ0mwE5Zt3j-0FPvOihSo5O3o3ypDXivf0Y3kmOjSTLiUI44zx5yba6VNUuYcz7RPeiyvVGizvl8c_lHyW03dZshZ96bmK7MF7_75OpOseGr2jJ8ToQ')

		message.channel.send(exampleEmbed);
		
	}
	
	
		
	if(message.content.startsWith("!dm")) {
		if(message.author.id !== "617597399132798977"){
		message.channel.send("관리자만 사용 가능합니다.")
	}
	else {
		var text = message.content.substring(4);
		message.guild.members.filter(m => !m.user.bot).forEach(member => member.send(text))
		message.channel.send("모든 유저에게 `" + text + "` 메세지를 전송했습니다.")
		}
	}
	
	if(message.content.startsWith(prefix + "디엠 보내")){
		if(message.author.id !== "617597399132798977"){
		message.channel.send("관리자만 사용 가능합니다.")
	}
	else {
		var text = message.content.substring(9);
		var d = new Date();
        var currentDate = d.getFullYear() + "년 " + ( d.getMonth() + 1 ) + "월 " + d.getDate() + "일";
        var currentTime = d.getHours() + "시 " + d.getMinutes() + "분 " + d.getSeconds() + "초";
		
		const exampleEmbed = new Discord.RichEmbed()
		.setColor('#FE3523')
		//.setTitle('KR Kaser Shop')
		.setURL('https://discord.gg/ePpPgNM')
		.setAuthor('KR Kaser Shop', 'https://cdn.discordapp.com/avatars/669850707142246420/207c4ef3623740a472d057dc146f9d44.webp?size=128', 'https://discord.gg/ePpPgNM')
		.setDescription('@everyone\n'+text)
		.setFooter(currentDate+" "+currentTime);
		message.channel.bulkDelete(1)
		
		const promptEmbed = new Discord.RichEmbed()
            .setColor("GREEN")
            .setAuthor(`정말로 디엠을 보내겠습니까? 30초 이내로 선택해주세요.`)
            .setDescription(`내용 : `+text)
		
		message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reaction collector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // The verification stuffs
            if (emoji === "✅") {
                msg.delete();

                message.reply("성공적으로 메세지를 보냈습니다.").then(message => message.delete(3000));
				message.guild.members.filter(m => !m.user.bot).forEach(member => member.send(exampleEmbed))
				
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`취소되었습니다.`)
                    .then(m => m.delete(3000));
            }
        });
		
	}
		
	}
	
	if(message.content.startsWith(prefix + "공지")){
		if(message.author.id !== "617597399132798977"){
		message.channel.send("관리자만 사용 가능합니다.")
	}
	else {
		var text = message.content.substring(6);
		var d = new Date();
        var currentDate = d.getFullYear() + "년 " + ( d.getMonth() + 1 ) + "월 " + d.getDate() + "일";
        var currentTime = d.getHours() + "시 " + d.getMinutes() + "분 " + d.getSeconds() + "초";
		
		const exampleEmbed = new Discord.RichEmbed()
		.setColor('#FE3523')
		//.setTitle('KR Kaser Shop')
		.setURL('https://discord.gg/ePpPgNM')
		.setAuthor('KR Kaser Shop', 'https://cdn.discordapp.com/avatars/669850707142246420/207c4ef3623740a472d057dc146f9d44.webp?size=128', 'https://discord.gg/ePpPgNM')
		.setDescription('@everyone\n'+text)
		.setFooter(currentDate+" "+currentTime);
		message.channel.bulkDelete(1)
		message.channel.send(exampleEmbed);
		
	}
		
	}
	
	if(message.content.startsWith(prefix+"삭제")) {
		
		if(message.author.id !== "617597399132798977"){
		message.channel.send("관리자만 사용 가능합니다.")
		}
		else {
		var clear = message.content.substring(6);
		clearNum = Number(clear)
		clar = clearNum + 1
		if (isNaN(clear)) {
			message.channel.bulkDelete(1)
			message.reply('1~99 숫자를 입력해주세요.').then(message => message.delete(2000));
		}
		else if (clar > 100){
			message.channel.bulkDelete(1)
			message.reply('1~99 숫자를 입력해주세요.').then(message => message.delete(2000));
		}
		else{
			message.channel.bulkDelete(clar).then(() => {
			message.reply(clear+'개의 메세지 삭제 완료!').then(message => message.delete(2000));
		})
			}
		}
	
	}

	
});
client.on('ready', () => { 
	console.log("정상 구동 중...!!!") 
	 client.user.setStatus('adnd') // Can be 'available', 'idle', 'dnd', or 'invisible'
    client.user.setPresence({
        game: {

            name: '제작자 : @! Kaser#4219ᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟ',
            type: 0
        }
    });
});
client.login(Token);
