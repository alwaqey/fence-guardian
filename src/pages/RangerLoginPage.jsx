import { useState } from "react";
import { supabase } from "../services/supabase";

export default function RangerNewIncidentPage() {
  const [photos, setPhotos] = useState([]);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function getLocation() {
    setMessage("جاري تحديد الموقع...");
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ latitude, longitude });
          setMessage("تم تحديد الموقع بنجاح");
          resolve();
        },
        (err) => {
          setMessage("فشل تحديد الموقع");
          reject(err);
        }
      );
    });
  }

  function capturePhoto(e) {
    const file = e.target.files[0];
    if (file) {
      setPhotos((p) => [...p, file]);
    }
  }

  async function submitIncident() {
    if (!coords) {
      alert("الرجاء تحديد الموقع");
      return;
    }
    if (photos.length === 0) {
      alert("الرجاء التقاط صورة واحدة على الأقل");
      return;
    }

    setLoading(true);
    setMessage("جاري رفع البلاغ...");

    // 1) INSERT INCIDENT RECORD
    const { data: incident, error: incidentErr } = await supabase
      .from("incidents")
      .insert([
        {
          ranger_id: "08e65e16-64ab-4110-bd2c-4b79b6f6267a",
          latitude: coords.latitude,
          longitude: coords.longitude,
          status: "new",
        },
      ])
      .select()
      .single();

    if (incidentErr) {
      setMessage("خطأ: فشل إنشاء البلاغ");
      setLoading(false);
      return;
    }

    // 2) UPLOAD PHOTOS
    for (const file of photos) {
      const filePath = `before/${incident.id}-${Date.now()}.jpg`;

      const { error: uploadErr } = await supabase.storage
        .from("incident-photos")
        .upload(filePath, file);

      if (uploadErr) {
        console.log(uploadErr);
        continue;
      }

      const url = `${supabase.storage
        .from("incident-photos")
        .getPublicUrl(filePath).data.publicUrl}`;

      // 3) SAVE PHOTO RECORD
      await supabase.from("incident_photos").insert([
        {
          incident_id: incident.id,
          photo_url: url,
          type: "before",
        },
      ]);
    }

    setMessage("تم إرسال البلاغ بنجاح 🎉");
    setLoading(false);
    setPhotos([]);
    setCoords(null);
  }

  return (
    <div style={{ padding: 30, direction: "rtl", textAlign: "right" }}>
      <h1>إرسال بلاغ قطع سياج</h1>

      <button onClick={getLocation} style={{ padding: 10, marginBottom: 15 }}>
        📍 تحديد الموقع
      </button>

      {coords && (
        <p>
          خط العرض: {coords.latitude.toFixed(6)} <br />
          خط الطول: {coords.longitude.toFixed(6)}
        </p>
      )}

      <label>📸 التقط صورة</label>
      <input type="file" accept="image/*" capture="camera" onChange={capturePhoto} />

      <div>
        {photos.map((p, i) => (
          <p key={i}>📷 صورة رقم {i + 1}</p>
        ))}
      </div>

      <button
        onClick={submitIncident}
        disabled={loading}
        style={{ marginTop: 20, padding: 10 }}
      >
        {loading ? "جاري الإرسال..." : "إرسال البلاغ"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
