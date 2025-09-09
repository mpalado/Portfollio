import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";

const openLink = (url: string) => {
  Linking.openURL(url).catch(() => {});
};

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.phone}>
        <View style={styles.statusBar} />
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://avatars.dicebear.com/api/initials/Myk.png",
            }}
            style={styles.avatar}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.name}>Myk Palado</Text>
            <Text style={styles.title}>Product Engineer • Designer</Text>
          </View>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={{ padding: 16 }}
        >
          <Section title="Bio">
            <Text style={styles.p}>
              Product-oriented software engineer focused on accessible,
              high-quality interfaces. I design and build fast, elegant web and
              mobile apps.
            </Text>
          </Section>

          <Section title="Skills">
            <View style={styles.skillGroups}>
              <SkillGroup
                title="Frontend"
                items={["React", "React Native", "TypeScript", "Tailwind"]}
              />
              <SkillGroup
                title="Backend"
                items={["Node.js", "Express", "Postgres"]}
              />
              <SkillGroup title="Tools" items={["Git", "Figma", "Vitest"]} />
            </View>
          </Section>

          <Section title="Projects">
            <ProjectCard
              title="Mobile Banking UI"
              tags={["React Native", "PWA"]}
              onPress={() => {}}
            />
            <ProjectCard
              title="AI Resume Builder"
              tags={["TypeScript", "LLM"]}
              onPress={() => {}}
            />
          </Section>

          <Section title="Contact">
            <View style={styles.row}>
              <ContactButton
                icon={<Feather name="mail" size={16} color="#6b21a8" />}
                label="Email"
                onPress={() => openLink("mailto:hello@example.com")}
              />
              <ContactButton
                icon={<Feather name="phone" size={16} color="#6b21a8" />}
                label="Call"
                onPress={() => openLink("tel:+1234567890")}
              />
            </View>
            <View style={[styles.row, { marginTop: 8 }]}>
              <ContactButton
                icon={<Entypo name="linkedin" size={16} color="#6b21a8" />}
                label="LinkedIn"
                onPress={() => openLink("https://linkedin.com")}
              />
              <ContactButton
                icon={<FontAwesome name="github" size={16} color="#6b21a8" />}
                label="GitHub"
                onPress={() => openLink("https://github.com")}
              />
            </View>
          </Section>

          <Section title="More">
            <Text style={styles.p}>
              Location: Manila, PH • 6+ years experience • Open to freelance &
              full-time roles
            </Text>
          </Section>

          <Text style={styles.footer}>
            © {new Date().getFullYear()} Myk Palado
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.skillGroup}>
      <Text style={styles.skillGroupTitle}>{title}</Text>
      <View style={styles.tags}>
        {items.map((it) => (
          <View key={it} style={styles.tag}>
            <Text style={styles.tagText}>{it}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function ProjectCard({
  title,
  tags,
  onPress,
}: {
  title: string;
  tags: string[];
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.tags}>
        {tags.map((t) => (
          <View key={t} style={[styles.tag, { backgroundColor: "#eef2ff" }]}>
            <Text style={styles.tagText}>{t}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

function ContactButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.contactBtn}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={{ marginRight: 8 }}>{icon}</View>
      <Text style={styles.contactLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  phone: {
    width: 360,
    height: 780,
    borderRadius: 36,
    backgroundColor: "#fff",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e6e6f0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 20,
  },
  statusBar: { height: Platform.OS === "ios" ? 20 : 0 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#7c3aed",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: { color: "#fff", fontSize: 18, fontWeight: "700" },
  title: { color: "#f3e8ff", fontSize: 12, marginTop: 2 },
  content: { flex: 1, backgroundColor: "#fff" },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  p: { color: "#374151", fontSize: 13, lineHeight: 18 },
  skillGroups: { flexDirection: "column" },
  skillGroup: {
    marginBottom: 8,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eef2ff",
  },
  skillGroupTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4b5563",
    marginBottom: 6,
  },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#f8fafc",
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: { color: "#6b21a8", fontSize: 12, fontWeight: "600" },
  card: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eef2ff",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  contactBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9d5ff",
    backgroundColor: "#fff",
  },
  contactLabel: { color: "#4c1d95", fontWeight: "700" },
  footer: {
    textAlign: "center",
    fontSize: 11,
    color: "#9ca3af",
    marginVertical: 16,
  },
});
