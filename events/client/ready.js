module.exports = (Discord, client) => {
    console.log('Failed Creation is up');
    let activities = [`Anime`, `Anime`, `Anime` , `Lucas dying`, `Lucas dying` , `Lucas dying`],i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ %  activities.length]}`,  {type:"WATCHING"}), 5000)
    client.user.setStatus('idle');
}