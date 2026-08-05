import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AppLayout from "../../components/layout/AppLayout";

import type { AppSettings } from "../../services/appSettingService";

import {
  getSettings,
  saveSettings,
} from "../../services/appSettingService";

export default function Settings() {
  const [settings, setSettings] = useState<AppSettings>({
    salon_name: "",
    phone: "",
    email: "",
    address: "",
    currency: "MMK",
    tax_percent: 0,
    receipt_footer: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load settings.");
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    try {
      await saveSettings(settings);
      toast.success("Settings saved successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Unable to save settings.");
    }
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Salon Settings
        </h1>

        <form
          onSubmit={handleSave}
          className="bg-white rounded-xl shadow p-6 space-y-4"
        >

          <div>
          <label className="mb-1 block font-medium">
            Salon Name
          </label>

          <input
            className="w-full border rounded-lg p-3"
            value={settings.salon_name}
            onChange={(e) =>
              setSettings({
                ...settings,
                salon_name: e.target.value,
              })
            }
          
          />
        </div>

          <div>
          <label className="mb-1 block font-medium">
            Phone Number
          </label>

          <input
            className="w-full border rounded-lg p-3"
            value={settings.phone ?? ""}
            onChange={(e) =>
              setSettings({
                ...settings,
                phone: e.target.value,
              })
            }
          
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Email
          </label>

          <input
            className="w-full border rounded-lg p-3"
            value={settings.email ?? ""}
            onChange={(e) =>
              setSettings({
                ...settings,
                email: e.target.value,
              })
            }
          />
        </div>

        
        <div>
          <label className="mb-1 block font-medium">
            Address
          </label>

          <input
            className="w-full border rounded-lg p-3"
            value={settings.address ?? ""}
            onChange={(e) =>
              setSettings({
                ...settings,
                address: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Currency
          </label>

          <input
            className="w-full border rounded-lg p-3"
            value={settings.currency}
            onChange={(e) =>
              setSettings({
                ...settings,
                currency: e.target.value,
              })
            }
          />
        </div>

          <div>
          <label className="mb-1 block font-medium">
            Tax %
          </label>

          <input
            className="w-full border rounded-lg p-3"
            value={settings.tax_percent ?? ""}
            onChange={(e) =>
              setSettings({
                ...settings,
                tax_percent: Number(e.target.value),
              })
            }
          />
        </div>

          <textarea
            className="w-full border rounded-lg p-3"
            rows={4}
            placeholder="Receipt Footer"
            value={settings.receipt_footer ?? ""}
            onChange={(e) =>
              setSettings({
                ...settings,
                receipt_footer: e.target.value,
              })
            }
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Save Settings
          </button>

        </form>
      </div>
    </AppLayout>
  );
}
