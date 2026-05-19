import React, {
  useEffect,
  useState,
} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import {
  Activity,
  Bell,
  Database,
  Dumbbell,
  ShoppingBag,
  Trophy,
  UserPlus,
  Users,
} from 'lucide-react-native';

import { Button } from '@/src/components/ui/Button';

import { Card } from '@/src/components/ui/Card';

import { EngagementChart } from '@/src/components/charts/EngagementChart';

import { useAuth } from '@/src/hooks/useAuth';

import {
  fetchAnalytics,
} from '@/src/services/api/analytics';

import { Colors } from '@/src/constants/theme';

const approvals = [
  {
    title:
      'Elite Powerlifting Pro',
    meta: 'New Program',
    icon: 'checklist',
  },

  {
    title:
      "Marcus 'The Ox' Chen",

    meta:
      'Trainer Verification',

    icon: 'user-plus',
  },

  {
    title:
      'Summer Grind 2024',

    meta:
      'Global Challenge',

    icon: 'trophy',
  },
];

const events = [
  {
    event: 'Login Anomaly',

    meta: 'Detected',

    user: 'usr_89234',

    time: '2 mins ago',

    tag: 'error',
  },

  {
    event:
      'New Pro Subscription',

    meta: '',

    user: 'Sarah Miller',

    time: '12 mins ago',

    tag: 'tertiary',
  },

  {
    event:
      'Workout Database Sync',

    meta: '',

    user: 'SYSTEM',

    time: '45 mins ago',

    tag: 'primary',
  },
];

export function AdminScreen() {
  const router = useRouter();

  const { user } =
    useAuth();

  const [
    analytics,
    setAnalytics,
  ] = useState({
    totalUsers: 0,

    totalWorkouts: 0,

    totalChallenges: 0,

    totalRevenue: 0,

    retentionRate: 0,
  });

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data =
          await fetchAnalytics();

        setAnalytics(data);
      } catch (error) {
        console.warn(
          'Load analytics failed',
          error
        );
      }
    }

    if (user) {
      loadAnalytics();
    }
  }, [user]);

  return (
    <ScrollView
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <View style={styles.headerRow}>
        <View style={styles.statusInfo}>
          <View
            style={
              styles.statusIcon
            }
          >
            <Database
              size={20}
              color={
                Colors.primary
              }
            />
          </View>

          <View>
            <Text
              style={
                styles.statusLabel
              }
            >
              System Status
            </Text>

            <Text
              style={
                styles.statusValue
              }
            >
              Admin Panel Connected
            </Text>
          </View>
        </View>

        <View
          style={
            styles.profileCircle
          }
        >
          <Bell
            size={18}
            color={
              Colors.onSurface
            }
          />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <Button
          style={
            styles.actionButton
          }
          onPress={() =>
            router.push(
              '/admin/add-workout'
            )
          }
        >
          <UserPlus
            size={18}
            color={
              Colors.onSurface
            }
          />

          <Text
            style={
              styles.buttonText
            }
          >
            Add Workout
          </Text>
        </Button>

        <Button
          variant="secondary"
          style={
            styles.actionButton
          }
          onPress={() =>
            router.push(
              '/new-challenge'
            )
          }
        >
          <Trophy
            size={18}
            color={
              Colors.onSurface
            }
          />

          <Text
            style={
              styles.buttonText
            }
          >
            New Challenge
          </Text>
        </Button>

        <Button
          variant="secondary"
          style={
            styles.actionButton
          }
          onPress={() =>
            router.push(
              '/admin/add-exercise'
            )
          }
        >
          <Dumbbell
            size={18}
            color={
              Colors.onSurface
            }
          />

          <Text
            style={
              styles.buttonText
            }
          >
            Add Exercise
          </Text>
        </Button>
      </View>

      <View style={styles.statCards}>
        <MetricCard
          icon={
            <Users
              size={28}
              color={
                Colors.tertiary
              }
            />
          }
          label="TOTAL USERS"
          value={`${(
            analytics?.totalUsers ??
            0
          ).toLocaleString()}`}
          detail="Live active users"
          color={
            Colors.tertiary
          }
        />

        <MetricCard
          icon={
            <Dumbbell
              size={28}
              color={
                Colors.primary
              }
            />
          }
          label="ACTIVE WORKOUTS"
          value={`${(
            analytics?.totalWorkouts ??
            0
          ).toLocaleString()}`}
          detail="Workouts tracked"
          color={
            Colors.primary
          }
        />

        <MetricCard
          icon={
            <ShoppingBag
              size={28}
              color={
                Colors.onSurfaceVariant
              }
            />
          }
          label="REVENUE (MRR)"
          value={`$${(
            analytics?.totalRevenue ??
            0
          ).toFixed(2)}`}
          detail="Monthly recurring"
          color={
            Colors.onSurfaceVariant
          }
        />
      </View>

      <Card
        style={
          styles.analyticsCard
        }
      >
        <View
          style={
            styles.analyticsHeader
          }
        >
          <Text
            style={
              styles.analyticsTitle
            }
          >
            User Engagement Trends
          </Text>

          <View
            style={
              styles.timeFilterRow
            }
          >
            <Text
              style={
                styles.timeFilterActive
              }
            >
              7D
            </Text>

            <Text
              style={
                styles.timeFilter
              }
            >
              30D
            </Text>
          </View>
        </View>

        <EngagementChart
          labels={[
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun',
          ]}
          data={[
            40,
            45,
            35,
            60,
            55,
            75,
            80,
          ]}
        />
      </Card>

      <Text
        style={
          styles.sectionHeading
        }
      >
        Approvals
      </Text>

      {approvals.map((item) => (
        <Card
          key={item.title}
          style={
            styles.approvalCard
          }
        >
          <View
            style={
              styles.approvalLeft
            }
          >
            <View
              style={
                styles.approvalIcon
              }
            >
              {item.icon ===
              'user-plus' ? (
                <UserPlus
                  size={18}
                  color={
                    Colors.primary
                  }
                />
              ) : item.icon ===
                'trophy' ? (
                <Trophy
                  size={18}
                  color={
                    Colors.primary
                  }
                />
              ) : (
                <Activity
                  size={18}
                  color={
                    Colors.primary
                  }
                />
              )}
            </View>

            <View>
              <Text
                style={
                  styles.approvalTitle
                }
              >
                {item.title}
              </Text>

              <Text
                style={
                  styles.approvalMeta
                }
              >
                {item.meta}
              </Text>
            </View>
          </View>

          <Text
            style={
              styles.approvalArrow
            }
          >
            ›
          </Text>
        </Card>
      ))}

      <Button
        variant="secondary"
        style={
          styles.fullButton
        }
        onPress={() =>
          router.push(
            '/manage-challenges'
          )
        }
      >
        VIEW ALL TASKS
      </Button>

      <Text
        style={
          styles.sectionHeading
        }
      >
        Recent System Events
      </Text>

      <Card
        style={
          styles.eventsCard
        }
      >
        {events.map((item) => (
          <View
            key={item.event}
            style={
              styles.eventRow
            }
          >
            <View
              style={
                styles.eventLeft
              }
            >
              <View
                style={[
                  styles.eventBadge,

                  item.tag ===
                  'error'
                    ? {
                        backgroundColor:
                          'rgba(239,68,68,0.12)',
                      }
                    : item.tag ===
                      'primary'
                    ? {
                        backgroundColor:
                          'rgba(59,130,246,0.12)',
                      }
                    : {
                        backgroundColor:
                          'rgba(167,139,250,0.12)',
                      },
                ]}
              />

              <View>
                <Text
                  style={
                    styles.eventTitle
                  }
                >
                  {item.event}
                </Text>

                {item.meta ? (
                  <Text
                    style={
                      styles.eventMeta
                    }
                  >
                    {item.meta}
                  </Text>
                ) : null}
              </View>
            </View>

            <View>
              <Text
                style={
                  styles.eventTime
                }
              >
                {item.time}
              </Text>

              <Text
                style={
                  styles.eventUser
                }
              >
                {item.user}
              </Text>
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
  color,
}: {
  icon: React.ReactNode;

  label: string;

  value: string;

  detail: string;

  color: string;
}) {
  return (
    <Card
      style={styles.metricCard}
    >
      <View
        style={[
          styles.metricIcon,

          {
            backgroundColor: `${color}22`,
          },
        ]}
      >
        {icon}
      </View>

      <Text
        style={
          styles.metricLabel
        }
      >
        {label}
      </Text>

      <Text
        style={
          styles.metricValue
        }
      >
        {value}
      </Text>

      <Text
        style={[
          styles.metricDetail,

          { color },
        ]}
      >
        {detail}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingBottom: 120,
    gap: 18,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',

    alignItems: 'center',
  },

  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  statusIcon: {
    width: 46,
    height: 46,

    borderRadius: 18,

    backgroundColor:
      Colors.card,

    alignItems: 'center',
    justifyContent: 'center',
  },

  statusLabel: {
    color:
      Colors.onSurfaceVariant,

    fontSize: 10,

    textTransform:
      'uppercase',

    letterSpacing: 1.2,
  },

  statusValue: {
    color: Colors.onSurface,

    fontSize: 14,

    fontWeight: '700',
  },

  profileCircle: {
    width: 48,
    height: 48,

    borderRadius: 16,

    backgroundColor:
      Colors.card,

    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonRow: {
    gap: 12,
  },

  actionButton: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'center',

    gap: 10,

    paddingVertical: 18,
  },

  buttonText: {
    color: Colors.onSurface,

    fontSize: 14,

    fontWeight: '700',
  },

  statCards: {
    gap: 12,
  },

  metricCard: {
    padding: 22,
  },

  metricIcon: {
    width: 60,
    height: 60,

    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 18,
  },

  metricLabel: {
    color:
      Colors.onSurfaceVariant,

    fontSize: 10,

    textTransform:
      'uppercase',

    marginBottom: 8,

    letterSpacing: 1.2,
  },

  metricValue: {
    color: Colors.onSurface,

    fontSize: 32,

    fontWeight: '900',

    marginBottom: 6,
  },

  metricDetail: {
    fontSize: 12,

    fontWeight: '700',
  },

  analyticsCard: {
    padding: 20,
  },

  analyticsHeader: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',

    marginBottom: 18,
  },

  analyticsTitle: {
    color: Colors.onSurface,

    fontSize: 18,

    fontWeight: '900',
  },

  timeFilterRow: {
    flexDirection: 'row',

    backgroundColor:
      Colors.surfaceLight,

    borderRadius: 16,

    padding: 6,
  },

  timeFilter: {
    color:
      Colors.onSurfaceVariant,

    paddingHorizontal: 12,

    paddingVertical: 8,

    fontSize: 10,

    fontWeight: '700',
  },

  timeFilterActive: {
    color: Colors.onSurface,

    paddingHorizontal: 12,

    paddingVertical: 8,

    fontSize: 10,

    fontWeight: '700',

    backgroundColor:
      Colors.card,

    borderRadius: 12,
  },

  sectionHeading: {
    color: Colors.onSurface,

    fontSize: 20,

    fontWeight: '900',
  },

  approvalCard: {
    padding: 20,
  },

  approvalLeft: {
    flexDirection: 'row',

    gap: 16,

    alignItems: 'center',
  },

  approvalIcon: {
    width: 44,
    height: 44,

    borderRadius: 16,

    backgroundColor:
      Colors.card,

    alignItems: 'center',
    justifyContent: 'center',
  },

  approvalTitle: {
    color: Colors.onSurface,

    fontSize: 16,

    fontWeight: '900',
  },

  approvalMeta: {
    color:
      Colors.onSurfaceVariant,

    fontSize: 12,
  },

  approvalArrow: {
    color:
      Colors.onSurfaceVariant,

    fontSize: 26,

    fontWeight: '700',
  },

  fullButton: {
    paddingVertical: 16,

    marginTop: 4,
  },

  eventsCard: {
    padding: 0,
  },

  eventRow: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',

    padding: 18,

    borderBottomWidth: 1,

    borderBottomColor:
      Colors.border,
  },

  eventLeft: {
    flexDirection: 'row',

    gap: 12,

    alignItems: 'center',
  },

  eventBadge: {
    width: 14,
    height: 14,

    borderRadius: 999,
  },

  eventTitle: {
    color: Colors.onSurface,

    fontSize: 14,

    fontWeight: '800',
  },

  eventMeta: {
    color:
      Colors.onSurfaceVariant,

    fontSize: 12,
  },

  eventTime: {
    color:
      Colors.onSurfaceVariant,

    fontSize: 12,

    textAlign: 'right',
  },

  eventUser: {
    color:
      Colors.onSurfaceVariant,

    fontSize: 12,

    marginTop: 4,

    textAlign: 'right',
  },
});