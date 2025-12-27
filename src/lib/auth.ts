import { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { isAdmin } from "./config"

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'identify email guilds guilds.members.read'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const discordProfile = profile as any
        token.discord = {
          id: discordProfile.id,
          username: discordProfile.username,
          discriminator: discordProfile.discriminator,
          avatar: discordProfile.avatar,
          banner: discordProfile.banner,
          accentColor: discordProfile.accent_color,
          verified: discordProfile.verified,
          email: discordProfile.email,
          createdAt: new Date(Number(BigInt(discordProfile.id) >> BigInt(22)) + 1420070400000).toISOString(),
        }
      }
      return token
    },
    async session({ session, token }) {
      session.discord = token.discord as {
        id: string;
        username: string;
        discriminator: string;
        avatar: string;
        banner: string;
        accentColor: number | null;
        verified: boolean;
        email: string;
        createdAt: string;
      }
      return session
    }
  }
}

export { isAdmin }

