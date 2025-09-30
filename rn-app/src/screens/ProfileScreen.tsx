import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
// HermesInfo import removed
import Weather from "../components/Weather";
import { fetchProfileData } from "../services/api";
import { ProfileData } from "../shared/api";

const openLink = (url: string) => {
  Linking.openURL(url).catch(() => {});
};

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await fetchProfileData();
        setProfileData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load profile data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <LinearGradient
          colors={['#8b5cf6', '#7c3aed', '#6d28d9']}
          style={styles.loadingGradient}
        >
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading your profile...</Text>
        </LinearGradient>
      </View>
    );
  }

  // Show error state
  if (error || !profileData) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 24 }]}>
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>
            {error || "Could not load profile data"}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setLoading(true);
              setError(null);
              fetchProfileData()
                .then(setProfileData)
                .catch(err => setError("Failed to load profile data"))
                .finally(() => setLoading(false));
            }}
          >
            <LinearGradient
              colors={['#8b5cf6', '#7c3aed']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.retryButtonGradient}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.phone}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['#8b5cf6', '#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <SafeAreaView style={styles.headerContent}>
            <Image
              source={{
                uri: profileData.avatar,
              }}
              style={styles.avatar}
            />
            <View style={styles.headerText}>
              <Text style={styles.name}>{profileData.name}</Text>
              <Text style={styles.title}>{profileData.title}</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <ScrollView
          style={styles.content}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Section title="Bio">
            <Text style={styles.p}>
              {profileData.bio}
            </Text>
          </Section>

          <Section title="Skills">
            <View style={styles.skillGroups}>
              <SkillGroup
                title="Frontend"
                items={profileData.skills.frontend}
              />
              <SkillGroup
                title="Backend"
                items={profileData.skills.backend}
              />
              <SkillGroup 
                title="Tools" 
                items={profileData.skills.tools} 
              />
            </View>
          </Section>

          <Section title="Projects">
            {profileData.projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                tags={project.tags}
                onPress={() => project.url ? openLink(project.url) : {}}
              />
            ))}
          </Section>

          <Section title="Contact">
            <View style={styles.row}>
              <ContactButton
                icon={<Feather name="mail" size={16} color="#6b21a8" />}
                label="Email"
                onPress={() => openLink(`mailto:${profileData.contact.email}`)}
              />
              <ContactButton
                icon={<Feather name="phone" size={16} color="#6b21a8" />}
                label="Call"
                onPress={() => openLink(`tel:${profileData.contact.phone}`)}
              />
            </View>
            <View style={[styles.row, { marginTop: 8 }]}>
              <ContactButton
                icon={<Entypo name="linkedin" size={16} color="#6b21a8" />}
                label="LinkedIn"
                onPress={() => openLink(profileData.contact.linkedin)}
              />
              <ContactButton
                icon={<FontAwesome name="github" size={16} color="#6b21a8" />}
                label="GitHub"
                onPress={() => openLink(profileData.contact.github)}
              />
            </View>
          </Section>

          <Section title="More">
            <Text style={styles.p}>
              Location: {profileData.location} • {profileData.experience} • {profileData.availability}
            </Text>
          </Section>

          <Section title="Local Weather">
            <Weather />
          </Section>
          <Text style={styles.footer}>
            © {new Date().getFullYear()} {profileData.name}
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
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionDivider} />
      </View>
      {children}
    </View>
  );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.skillGroup}>
      <View style={styles.skillGroupHeader}>
        <Text style={styles.skillGroupTitle}>{title}</Text>
      </View>
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
      <LinearGradient
        colors={['#f9f9f9', '#ffffff']}
        style={styles.cardGradient}
      >
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.tags}>
          {tags.map((t) => (
            <View key={t} style={[styles.tag, { backgroundColor: "#f5f3ff" }]}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
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
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={['#ffffff', '#f9fafb']}
        style={styles.contactBtnGradient}
      >
        <View style={styles.contactIcon}>{icon}</View>
        <Text style={styles.contactLabel}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    width: "100%",
  },
  loadingGradient: {
    width: 200,
    height: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  errorCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '90%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  retryButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  retryButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  phone: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f9fafb",
    overflow: "hidden",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : StatusBar.currentHeight || 24,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerText: {
    marginLeft: 16,
    flex: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  name: { 
    color: "#fff", 
    fontSize: 22, 
    fontWeight: "700",
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  },
  title: { 
    color: "#f3e8ff", 
    fontSize: 14, 
    marginTop: 4,
    fontWeight: "500"
  },
  content: { 
    flex: 1, 
    backgroundColor: "#f9fafb",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#718096",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4a5568",
    marginRight: 10,
  },
  sectionDivider: {
    height: 1,
    flex: 1,
    backgroundColor: "#e2e8f0",
  },
  p: { 
    color: "#4a5568", 
    fontSize: 14, 
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  skillGroups: { 
    flexDirection: "column",
    gap: 12,
  },
  skillGroup: {
    marginBottom: 8,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#718096",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  skillGroupHeader: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 8,
  },
  skillGroupTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  tags: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 8
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#f8fafc",
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: { 
    color: "#7c3aed", 
    fontSize: 13, 
    fontWeight: "500" 
  },
  card: {
    borderRadius: 14,
    marginBottom: 12,
    backgroundColor: "#fff",
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardGradient: {
    padding: 16,
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: "700", 
    color: "#1e293b",
    marginBottom: 8,
  },
  row: { 
    flexDirection: "row", 
    justifyContent: "space-between",
    gap: 10,
  },
  contactBtn: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  contactBtnGradient: {
    paddingVertical: 14,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  contactIcon: {
    marginRight: 8,
  },
  contactLabel: { 
    color: "#4c1d95", 
    fontWeight: "600",
    fontSize: 13,
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#94a3b8",
    marginVertical: 20,
    fontWeight: "500",
  },
});
