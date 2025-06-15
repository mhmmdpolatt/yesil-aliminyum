"use client";

import React, { useEffect, useState } from "react";

type Address = { label: string; address: string };
type MapEmbed = { label: string; url: string };

type ContactInfo = {
  _id: string;
  addresses: Address[];
  emails: string[];
  phones: string[];
  mapEmbedsUrl: MapEmbed[];
  createdAt: string;
};

export default function ContactInfoListPage() {
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const [editId, setEditId] = useState<string | null>(null);
  const [editAddresses, setEditAddresses] = useState<Address[]>([]);
  const [editEmails, setEditEmails] = useState<string[]>([]);
  const [editPhones, setEditPhones] = useState<string[]>([]);
  const [editMapEmbeds, setEditMapEmbeds] = useState<MapEmbed[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/contact-info");
      const data = await res.json();
      setContacts(data);
    } catch {
      setMessage("Veriler alınamadı.");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(contact: ContactInfo) {
    setEditId(contact._id);
    setEditAddresses(contact.addresses);
    setEditEmails(contact.emails);
    setEditPhones(contact.phones);
    setEditMapEmbeds(contact.mapEmbedsUrl);
    setMessage(null);
  }

  function clearEditForm() {
    setEditId(null);
    setEditAddresses([]);
    setEditEmails([]);
    setEditPhones([]);
    setEditMapEmbeds([]);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editId) return;

    setMessage(null);

    try {
      const res = await fetch(`/api/contact-info?id=${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addresses: editAddresses,
          emails: editEmails,
          phones: editPhones,
          mapEmbedsUrl: editMapEmbeds,
        }),
      });

      const updated = await res.json();

      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c._id === editId ? updated : c))
        );
        setMessage("Güncelleme başarılı.");
        clearEditForm();
      } else {
        setMessage(updated.message || "Güncellenemedi.");
      }
    } catch {
      setMessage("Sunucu hatası.");
    }
  }

  async function handleDelete(id: string) {
    const confirm = window.confirm(
      "Bu iletişim bilgisini silmek istiyor musun?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`/api/contact-info?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
        setMessage("Silme başarılı.");
        if (editId === id) clearEditForm();
      } else {
        setMessage(result.message || "Silinemedi.");
      }
    } catch {
      setMessage("Sunucu hatası.");
    }
  }

  // --- Helpers: Dinamik inputlar için ---
  const updateListItem = <T,>(
    list: T[],
    index: number,
    value: Partial<T>,
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    const updated = [...list];
    updated[index] = { ...updated[index], ...value };
    setter(updated);
  };

  const removeItem = <T,>(
    list: T[],
    index: number,
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => setter(list.filter((_, i) => i !== index));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">İletişim Bilgileri</h1>

      {message && <p className="mb-4 text-red-600">{message}</p>}

      {loading ? (
        <p>Yükleniyor...</p>
      ) : contacts.length === 0 ? (
        <p>Hiç iletişim bilgisi eklenmemiş.</p>
      ) : (
        <table className="w-full text-left border mb-8">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Adresler</th>
              <th className="p-2 border">E-postalar</th>
              <th className="p-2 border">Telefonlar</th>
              <th className="p-2 border">Harita</th>
              <th className="p-2 border">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id}>
                <td className="p-2 border">
                  <ul className="list-disc ml-4">
                    {c.addresses.map((a, i) => (
                      <li key={i}>
                        <strong>{a.label}:</strong> {a.address}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-2 border">
                  <ul>
                    {c.emails.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-2 border">
                  <ul>
                    {c.phones.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-2 border">
                  <ul>
                    {c.mapEmbedsUrl.map((m, i) => (
                      <li key={i}>
                        <a
                          href={m.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {m.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-2 border space-y-1">
                  <button
                    onClick={() => startEdit(c)}
                    className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 text-sm w-full"
                  >
                    Güncelle
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm w-full"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editId && (
        <form
          onSubmit={handleUpdate}
          className="bg-gray-50 p-4 rounded shadow max-w-4xl mx-auto space-y-6"
        >
          <h2 className="text-xl font-semibold">Güncelle</h2>

          {/* Adresler */}
          <div>
            <label className="block font-semibold mb-2">Adresler</label>
            {editAddresses.map((a, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Etiket"
                  value={a.label}
                  onChange={(e) =>
                    updateListItem(
                      editAddresses,
                      i,
                      { label: e.target.value },
                      setEditAddresses
                    )
                  }
                  className="p-2 border rounded flex-1"
                />
                <input
                  type="text"
                  placeholder="Adres"
                  value={a.address}
                  onChange={(e) =>
                    updateListItem(
                      editAddresses,
                      i,
                      { address: e.target.value },
                      setEditAddresses
                    )
                  }
                  className="p-2 border rounded flex-2"
                />
                <button
                  type="button"
                  onClick={() => removeItem(editAddresses, i, setEditAddresses)}
                  className="text-red-600 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setEditAddresses((prev) => [
                  ...prev,
                  { label: "", address: "" },
                ])
              }
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Adres Ekle
            </button>
          </div>

          {/* E-posta */}
          <div>
            <label className="block font-semibold mb-2">E-postalar</label>
            {editEmails.map((email, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="email"
                  placeholder="E-posta"
                  value={email}
                  onChange={(e) =>
                    updateListItem(editEmails, i, e.target.value, setEditEmails)
                  }
                  className="p-2 border rounded flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeItem(editEmails, i, setEditEmails)}
                  className="text-red-600 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setEditEmails((prev) => [...prev, ""])}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              E-posta Ekle
            </button>
          </div>

          {/* Telefon */}
          <div>
            <label className="block font-semibold mb-2">Telefonlar</label>
            {editPhones.map((phone, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Telefon"
                  value={phone}
                  onChange={(e) =>
                    updateListItem(editPhones, i, e.target.value, setEditPhones)
                  }
                  className="p-2 border rounded flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeItem(editPhones, i, setEditPhones)}
                  className="text-red-600 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setEditPhones((prev) => [...prev, ""])}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Telefon Ekle
            </button>
          </div>

          {/* Harita URL'leri */}
          <div>
            <label className="block font-semibold mb-2">Harita Embed URL</label>
            {editMapEmbeds.map((m, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Etiket"
                  value={m.label}
                  onChange={(e) =>
                    updateListItem(
                      editMapEmbeds,
                      i,
                      { label: e.target.value },
                      setEditMapEmbeds
                    )
                  }
                  className="p-2 border rounded flex-1"
                />
                <input
                  type="url"
                  placeholder="https://..."
                  value={m.url}
                  onChange={(e) =>
                    updateListItem(
                      editMapEmbeds,
                      i,
                      { url: e.target.value },
                      setEditMapEmbeds
                    )
                  }
                  className="p-2 border rounded flex-2"
                />
                <button
                  type="button"
                  onClick={() => removeItem(editMapEmbeds, i, setEditMapEmbeds)}
                  className="text-red-600 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setEditMapEmbeds((prev) => [...prev, { label: "", url: "" }])
              }
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Harita Ekle
            </button>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Kaydet
            </button>
            <button
              type="button"
              onClick={clearEditForm}
              className="bg-gray-400 text-black px-4 py-2 rounded"
            >
              İptal
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
