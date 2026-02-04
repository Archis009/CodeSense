import React, { useState, useEffect } from 'react';
import { Save, LogOut, User, Mail, FileText, Camera, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { authService } from '../services/api';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      name: user?.name || '',
      email: user?.email || '',
      description: user?.description || '',
      profileImage: user?.profileImage || null
    };
  });

  useEffect(() => {
    // Other side effects if needed
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image is too large. Please select an image under 5MB.");
        return;
      }
      try {
        const compressedImage = await compressImage(file);
        setFormData({ ...formData, profileImage: compressedImage });
      } catch (error) {
        console.error("Error compressing image:", error);
        alert("Failed to process image.");
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Call API to update profile
      await authService.updateProfile(formData);
      
      // Dispatch custom event to notify other components (like Navbar)
      window.dispatchEvent(new Event('user-updated'));
      
      // Optional: Visual feedback could be added here
    } catch (error) {
      console.error("Save error:", error);
      if (error.response && error.response.status === 413) {
         alert("Image is too large for the server. Please try a smaller image.");
      } else if (error.response && error.response.data && error.response.data.message) {
         alert(`Failed to save profile: ${error.response.data.message}`);
      } else {
         alert(`Failed to save profile: ${error.message || "Unknown error"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary w-fit">
          Profile Settings
        </h1>
        <p className="text-text-muted dark:text-slate-400">
          Manage your personal information and account preferences.
        </p>
      </div>

      <div className="opacity-100 transform translate-y-0 transition-all duration-500 ease-in-out">
        <Card>
          <form onSubmit={handleSave} className="space-y-8">
            {/* Profile Image Section */}
            <div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-background dark:bg-slate-800/50 rounded-2xl border border-surface dark:border-slate-800">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-surface dark:bg-slate-800 flex items-center justify-center overflow-hidden border-4 border-background dark:border-slate-700 shadow-lg">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-text-muted" />
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                  <Camera className="w-8 h-8" />
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
              <div className="text-center sm:text-left space-y-2">
                <h3 className="font-bold text-xl">Profile Photo</h3>
                <p className="text-sm text-text-muted max-w-xs">
                  Upload a new profile image. Recommended size 400x400px.
                </p>
                <div className="flex gap-3 justify-center sm:justify-start pt-2">
                  <label className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg cursor-pointer transition-colors">
                    Upload New
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                  {formData.profileImage && (
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, profileImage: null})}
                      className="px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-text-main dark:text-slate-300 ml-1">Full Name</label>
                  <Input
                    icon={User}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="h-12"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-text-main dark:text-slate-300 ml-1">Email Address</label>
                  <Input
                    icon={Mail}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    type="email"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold text-text-main dark:text-slate-300 ml-1">Bio / Description</label>
                <div className="relative">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us a bit about yourself..."
                    className="w-full h-40 px-4 py-4 pl-11 rounded-xl border border-surface dark:border-slate-700 bg-background dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-base leading-relaxed"
                  />
                  <FileText className="absolute top-4 left-3.5 w-5 h-5 text-text-muted" />
                </div>
                <p className="text-xs text-text-muted text-right">
                  {formData.description.length}/500 characters
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-surface dark:border-slate-700">
              <Button type="button" variant="ghost" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-11 px-6">
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
              <Button type="submit" disabled={loading} className="h-11 px-8 text-base">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
