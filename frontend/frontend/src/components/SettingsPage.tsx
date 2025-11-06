import { motion } from 'motion/react';
import { 
  Heart, 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Smartphone, 
  Moon, 
  Globe, 
  Volume2,
  Vibrate,
  Clock,
  MapPin,
  Phone,
  Mail,
  Key,
  Database,
  Download,
  Trash2,
  Info
} from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { useState } from 'react';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

export default function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [emergencyMode, setEmergencyMode] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoDetection, setAutoDetection] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00B8D9] to-[#0077FF] px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => onNavigate('dashboard')}
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#00B8D9]" />
            </div>
            <div>
              <h1 className="text-white">Settings</h1>
              <p className="text-white/80">
                Manage your LifeLink AI preferences and security
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-12 space-y-6">
        
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00B8D9] to-[#0077FF] rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-800">Profile Information</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-700 mb-2 block">First Name</Label>
                <Input id="firstName" defaultValue="John" className="rounded-xl" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-700 mb-2 block">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" className="rounded-xl" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input id="email" type="email" defaultValue="john.doe@example.com" className="rounded-xl pl-11" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-gray-700 mb-2 block">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input id="phone" type="tel" defaultValue="+1 555-0123" className="rounded-xl pl-11" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age" className="text-gray-700 mb-2 block">Age</Label>
                <Input id="age" type="number" defaultValue="32" className="rounded-xl" />
              </div>
              <div>
                <Label htmlFor="bloodType" className="text-gray-700 mb-2 block">Blood Type</Label>
                <Select defaultValue="o-positive">
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a-positive">A+</SelectItem>
                    <SelectItem value="a-negative">A-</SelectItem>
                    <SelectItem value="b-positive">B+</SelectItem>
                    <SelectItem value="b-negative">B-</SelectItem>
                    <SelectItem value="o-positive">O+</SelectItem>
                    <SelectItem value="o-negative">O-</SelectItem>
                    <SelectItem value="ab-positive">AB+</SelectItem>
                    <SelectItem value="ab-negative">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Emergency Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-800">Emergency Alerts</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <div className="text-gray-800 mb-1">Push Notifications</div>
                  <div className="text-gray-500 text-sm">Receive alerts on your device</div>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Volume2 className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <div className="text-gray-800 mb-1">Sound Alerts</div>
                  <div className="text-gray-500 text-sm">Play sound for critical alerts</div>
                </div>
              </div>
              <Switch checked={soundAlerts} onCheckedChange={setSoundAlerts} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Vibrate className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <div className="text-gray-800 mb-1">Vibration</div>
                  <div className="text-gray-500 text-sm">Vibrate for emergency alerts</div>
                </div>
              </div>
              <Switch checked={vibration} onCheckedChange={setVibration} />
            </div>

            <Separator />

            <div>
              <Label htmlFor="responseTime" className="text-gray-700 mb-2 block">Emergency Response Time</Label>
              <Select defaultValue="5">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Instant (0s)</SelectItem>
                  <SelectItem value="5">5 seconds</SelectItem>
                  <SelectItem value="10">10 seconds</SelectItem>
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-gray-500 text-sm mt-2">Time before auto-contacting emergency services</p>
            </div>
          </div>
        </motion.div>

        {/* Health Monitoring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-800">Health Monitoring</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <div className="text-gray-800 mb-1">Auto-Detection</div>
                  <div className="text-gray-500 text-sm">Automatically detect health anomalies</div>
                </div>
              </div>
              <Switch checked={autoDetection} onCheckedChange={setAutoDetection} />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="heartRateMin" className="text-gray-700 mb-2 block">Min Heart Rate Alert</Label>
                <div className="relative">
                  <Input id="heartRateMin" type="number" defaultValue="50" className="rounded-xl pr-16" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">BPM</span>
                </div>
              </div>
              <div>
                <Label htmlFor="heartRateMax" className="text-gray-700 mb-2 block">Max Heart Rate Alert</Label>
                <div className="relative">
                  <Input id="heartRateMax" type="number" defaultValue="150" className="rounded-xl pr-16" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">BPM</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="spo2Threshold" className="text-gray-700 mb-2 block">SpO₂ Threshold</Label>
              <div className="relative">
                <Input id="spo2Threshold" type="number" defaultValue="90" className="rounded-xl pr-12" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">Alert when oxygen level drops below this value</p>
            </div>

            <div>
              <Label htmlFor="monitoringInterval" className="text-gray-700 mb-2 block">Monitoring Frequency</Label>
              <Select defaultValue="continuous">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="continuous">Continuous</SelectItem>
                  <SelectItem value="1min">Every 1 minute</SelectItem>
                  <SelectItem value="5min">Every 5 minutes</SelectItem>
                  <SelectItem value="15min">Every 15 minutes</SelectItem>
                  <SelectItem value="30min">Every 30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Connected Devices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-800">Connected Devices</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Google Fit', status: 'Connected', icon: '📊', color: 'green' },
              { name: 'Apple Watch', status: 'Not Connected', icon: '⌚', color: 'gray' },
              { name: 'Fitbit', status: 'Not Connected', icon: '🏃', color: 'gray' },
            ].map((device) => (
              <div key={device.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{device.icon}</div>
                  <div>
                    <div className="text-gray-800">{device.name}</div>
                    <div className={`text-sm ${device.status === 'Connected' ? 'text-green-600' : 'text-gray-500'}`}>
                      {device.status}
                    </div>
                  </div>
                </div>
                <Button 
                  variant={device.status === 'Connected' ? 'outline' : 'default'}
                  className="rounded-xl"
                >
                  {device.status === 'Connected' ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy & Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-8 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-800">Privacy & Location</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <div className="text-gray-800 mb-1">Emergency Location Sharing</div>
                  <div className="text-gray-500 text-sm">Share location during emergencies</div>
                </div>
              </div>
              <Switch checked={locationSharing} onCheckedChange={setLocationSharing} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <div className="text-gray-800 mb-1">Emergency Mode</div>
                  <div className="text-gray-500 text-sm">Enhanced monitoring and faster response</div>
                </div>
              </div>
              <Switch checked={emergencyMode} onCheckedChange={setEmergencyMode} />
            </div>

            <Separator />

            <div>
              <Label className="text-gray-700 mb-3 block">Data Retention</Label>
              <Select defaultValue="1year">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">30 days</SelectItem>
                  <SelectItem value="3months">3 months</SelectItem>
                  <SelectItem value="6months">6 months</SelectItem>
                  <SelectItem value="1year">1 year</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-gray-500 text-sm mt-2">How long to keep your health data</p>
            </div>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-800">Preferences</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Moon className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <div className="text-gray-800 mb-1">Dark Mode</div>
                  <div className="text-gray-500 text-sm">Use dark theme</div>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <Separator />

            <div>
              <Label htmlFor="language" className="text-gray-700 mb-2 block">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timezone" className="text-gray-700 mb-2 block">Timezone</Label>
              <Select defaultValue="pst">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">PST (UTC-8)</SelectItem>
                  <SelectItem value="mst">MST (UTC-7)</SelectItem>
                  <SelectItem value="cst">CST (UTC-6)</SelectItem>
                  <SelectItem value="est">EST (UTC-5)</SelectItem>
                  <SelectItem value="utc">UTC (UTC+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="units" className="text-gray-700 mb-2 block">Units</Label>
              <Select defaultValue="imperial">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="imperial">Imperial (lbs, ft)</SelectItem>
                  <SelectItem value="metric">Metric (kg, m)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-8 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <Key className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-800">Security</h2>
          </div>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start rounded-xl">
              <Key className="w-5 h-5 mr-3" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start rounded-xl">
              <Shield className="w-5 h-5 mr-3" />
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start rounded-xl">
              <Phone className="w-5 h-5 mr-3" />
              Manage Trusted Devices
            </Button>
          </div>
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-3xl p-8 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-800">Data Management</h2>
          </div>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start rounded-xl">
              <Download className="w-5 h-5 mr-3" />
              Export Health Data
            </Button>
            <Button variant="outline" className="w-full justify-start rounded-xl text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
              <Trash2 className="w-5 h-5 mr-3" />
              Delete All Data
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-blue-900 text-sm">
              Your health data is encrypted and stored securely. Only you and your authorized emergency contacts have access.
            </p>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4"
        >
          <Button 
            className="flex-1 bg-gradient-to-r from-[#00B8D9] to-[#0077FF] hover:from-[#00A5C6] hover:to-[#0066E6] text-white rounded-2xl py-6 transition-all hover:scale-105"
          >
            Save Changes
          </Button>
          <Button 
            variant="outline"
            className="flex-1 rounded-2xl py-6"
            onClick={() => onNavigate('dashboard')}
          >
            Cancel
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
