import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, User, Upload, CheckCircle2, ChevronRight, ChevronLeft, ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
import { categories } from '../data/data';

const STEPS = [
  { id: 1, label: 'Info Bisnis', icon: Building2 },
  { id: 2, label: 'Info Pemilik', icon: User },
  { id: 3, label: 'Upload Dokumen', icon: Upload },
];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const done = current > step.id;
        const active = current === step.id;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  done
                    ? 'bg-green-500 shadow-lg'
                    : active
                    ? 'bg-primary-600 shadow-glow-blue shadow-lg'
                    : 'bg-surface-200'
                }`}
              >
                {done ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} />
                )}
              </div>
              <span className={`text-xs font-medium mt-2 ${
                active ? 'text-primary-700' : done ? 'text-green-600' : 'text-slate-400'
              }`}>
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-all duration-500 ${
                current > step.id ? 'bg-green-400' : 'bg-surface-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Step1({ data, onChange }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="label-base" htmlFor="claim-business-name">Nama Bisnis *</label>
        <input
          id="claim-business-name"
          type="text"
          placeholder="cth: Agus Tech Repair"
          value={data.businessName}
          onChange={(e) => onChange('businessName', e.target.value)}
          className="input-base"
          required
        />
      </div>
      <div>
        <label className="label-base" htmlFor="claim-category">Kategori Bisnis *</label>
        <select
          id="claim-category"
          value={data.category}
          onChange={(e) => onChange('category', e.target.value)}
          className="input-base"
          required
        >
          <option value="">Pilih kategori...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label-base" htmlFor="claim-address">Alamat Lengkap *</label>
        <textarea
          id="claim-address"
          rows={3}
          placeholder="Jl. contoh No. 1, Kelurahan, Kecamatan, Kota"
          value={data.address}
          onChange={(e) => onChange('address', e.target.value)}
          className="input-base resize-none"
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-base" htmlFor="claim-phone">Nomor WhatsApp *</label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="claim-phone"
              type="tel"
              placeholder="08xxxxxxxxxx"
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="input-base pl-10"
              required
            />
          </div>
        </div>
        <div>
          <label className="label-base" htmlFor="claim-website">Website (opsional)</label>
          <input
            id="claim-website"
            type="url"
            placeholder="https://"
            value={data.website}
            onChange={(e) => onChange('website', e.target.value)}
            className="input-base"
          />
        </div>
      </div>
      <div>
        <label className="label-base" htmlFor="claim-desc">Deskripsi Singkat *</label>
        <textarea
          id="claim-desc"
          rows={4}
          placeholder="Ceritakan tentang bisnis Anda, produk/layanan yang ditawarkan..."
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
          className="input-base resize-none"
          required
        />
      </div>
    </div>
  );
}

function Step2({ data, onChange }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="label-base" htmlFor="claim-owner-name">Nama Lengkap Pemilik *</label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="claim-owner-name"
            type="text"
            placeholder="Sesuai KTP"
            value={data.ownerName}
            onChange={(e) => onChange('ownerName', e.target.value)}
            className="input-base pl-10"
            required
          />
        </div>
      </div>
      <div>
        <label className="label-base" htmlFor="claim-ktp">Nomor KTP *</label>
        <input
          id="claim-ktp"
          type="text"
          placeholder="16 digit nomor KTP"
          maxLength={16}
          value={data.ktpNumber}
          onChange={(e) => onChange('ktpNumber', e.target.value.replace(/\D/g, ''))}
          className="input-base"
          required
        />
        <p className="text-xs text-slate-400 mt-1">Data KTP hanya digunakan untuk verifikasi dan tidak dipublikasikan.</p>
      </div>
      <div>
        <label className="label-base" htmlFor="claim-owner-email">Email Aktif *</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="claim-owner-email"
            type="email"
            placeholder="email@contoh.com"
            value={data.ownerEmail}
            onChange={(e) => onChange('ownerEmail', e.target.value)}
            className="input-base pl-10"
            required
          />
        </div>
      </div>
      <div>
        <label className="label-base" htmlFor="claim-owner-phone">Nomor HP Pemilik *</label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="claim-owner-phone"
            type="tel"
            placeholder="08xxxxxxxxxx"
            value={data.ownerPhone}
            onChange={(e) => onChange('ownerPhone', e.target.value)}
            className="input-base pl-10"
            required
          />
        </div>
      </div>
      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
        <p className="text-sm text-primary-700 font-medium mb-1">🔒 Data Anda Aman</p>
        <p className="text-xs text-primary-600">Semua data pemilik dienkripsi dan hanya digunakan untuk proses verifikasi Verified Pro.</p>
      </div>
    </div>
  );
}

function UploadBox({ label, id, hint }) {
  const [file, setFile] = useState(null);
  const handleChange = (e) => setFile(e.target.files[0]);
  return (
    <div>
      <label className="label-base" htmlFor={id}>{label}</label>
      <label
        htmlFor={id}
        className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${
          file
            ? 'border-green-400 bg-green-50'
            : 'border-surface-300 bg-surface-50 hover:border-primary-400 hover:bg-primary-50'
        }`}
      >
        {file ? (
          <div className="text-center">
            <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-700">{file.name}</p>
            <p className="text-xs text-green-500 mt-0.5">Siap diupload</p>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600 font-medium">Klik atau seret file ke sini</p>
            <p className="text-xs text-slate-400 mt-0.5">{hint}</p>
          </div>
        )}
        <input id={id} type="file" className="hidden" accept="image/*" onChange={handleChange} />
      </label>
    </div>
  );
}

function Step3() {
  return (
    <div className="space-y-6">
      <UploadBox label="Foto KTP Pemilik *" id="upload-ktp" hint="JPG, PNG, max 5MB" />
      <UploadBox label="Foto Tempat Usaha *" id="upload-store" hint="Tampak depan yang jelas, JPG/PNG max 10MB" />
      <UploadBox label="Dokumen Pendukung (Opsional)" id="upload-doc" hint="SIUP, NIB, atau surat keterangan usaha" />
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
        <p className="text-sm text-amber-800 font-medium mb-1">📋 Catatan Verifikasi</p>
        <p className="text-xs text-amber-700 leading-relaxed">
          Proses verifikasi memakan waktu 1–3 hari kerja. Anda akan menerima email konfirmasi. Badge "Verified Pro" akan otomatis tampil setelah disetujui.
        </p>
      </div>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div className="text-center py-8 animate-fade-in">
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </div>
      <h2 className="text-2xl font-black text-slate-900 mb-3">Pengajuan Terkirim! 🎉</h2>
      <p className="text-slate-500 mb-2 leading-relaxed max-w-sm mx-auto">
        Tim verifikasi Goleet.id akan memeriksa dokumen Anda dalam 1–3 hari kerja.
      </p>
      <p className="text-sm text-slate-400 mb-8">Cek email Anda untuk update status verifikasi.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="btn-primary">
          Kembali ke Beranda
        </Link>
        <Link to="/auth" className="btn-secondary">
          Masuk ke Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function Claim() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    address: '',
    phone: '',
    website: '',
    description: '',
    ownerName: '',
    ktpNumber: '',
    ownerEmail: '',
    ownerPhone: '',
  });

  const updateField = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else setDone(true);
  };

  const handleBack = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-surface-50 pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>

        <div className="card p-6 sm:p-10">
          {done ? (
            <SuccessScreen />
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-black text-slate-900 mb-2">Klaim Bisnis Anda</h1>
                <p className="text-slate-500 text-sm">Dapatkan badge "Verified Pro" dan akses ke dashboard bisnis</p>
              </div>

              <StepIndicator current={step} />

              <div className="animate-fade-in">
                {step === 1 && <Step1 data={formData} onChange={updateField} />}
                {step === 2 && <Step2 data={formData} onChange={updateField} />}
                {step === 3 && <Step3 />}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-100">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    step === 1
                      ? 'opacity-0 pointer-events-none'
                      : 'bg-surface-100 hover:bg-surface-200 text-slate-700'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </button>

                <span className="text-xs text-slate-400">
                  Langkah {step} dari {STEPS.length}
                </span>

                <button
                  type="button"
                  id={`claim-next-${step}`}
                  onClick={handleNext}
                  className="btn-primary"
                >
                  {step === 3 ? 'Kirim Pengajuan' : 'Lanjut'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
