let handler = m => m;

handler.before = async function (m, { conn, participants, groupMetadata }) {
    const groupAdmins = participants.filter(p => p.admin);
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
    const listAdmin = groupAdmins.map(v => `- @${v.id.split('@')[0]}`).join('\n');

    // Se ci sono 20 o più mention e l'autore non è il bot
    if (m.mentionedJid.length >= 20 && m.sender !== conn.user.jid) {
        await conn.reply(
            m.chat,
            `> ⚠️ 𝐀𝐧𝐭𝐢-𝐓𝐚𝐠\n> ⓘ 𝐋'𝐮𝐭𝐞𝐧𝐭𝐞 𝐜𝐨𝐧 𝐓𝐚𝐠-𝐀𝐥𝐥 𝐞' 𝐬𝐭𝐚𝐭𝐨 𝐫𝐢𝐦𝐨𝐬𝐬𝐨.\n${listAdmin}`,
            m,
            { mentions: [...groupAdmins.map(v => v.id), owner] }
        );
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
    }
};

export default handler;
