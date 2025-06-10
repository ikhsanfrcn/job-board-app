/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import axios from '@/lib/axios';
import { SubscriptionPlan } from '@/types/subscriptionType';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PlanFormModal } from './_components/subscriptionPlan';
import { PlanCard } from './_components/planCard';
import { ConfirmModal } from '@/components/atoms/ConfirmModal';

export default function Page() {
  const { data: session } = useSession();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [initialValues, setInitialValues] = useState({
    id: '',
    name: '',
    type: '',
    price: '',
    features: '',
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const token = session?.accessToken;

  const fetchPlans = async () => {
    try {
      const res = await axios.get<{ data: SubscriptionPlan[] }>('/subscriptions' );
      setPlans(res.data.data);
    } catch (err) {
      console.error('Error fetching plans:', err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = async (values: any, resetForm: () => void) => {
    const featuresArray = typeof values.features === 'string'
      ? values.features.split('\n').map((f: string) => f.trim()).filter((f: any) => f)
      : values.features;

    const payload = {
      ...values,
      price: Number(values.price),
      features: featuresArray,
    };

    try {
      if (isEdit && values.id) {
        await axios.patch(`/subscriptions/${values.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Plan updated successfully!');
      } else {
        await axios.post('/subscriptions', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Plan created successfully!');
      }
      resetForm();
      setModalOpen(false);
      setIsEdit(false);
      fetchPlans();
    } catch (err) {
      console.error('Error saving plan:', err);
    }
  };

  const handleEdit = (plan: SubscriptionPlan) => {
    setInitialValues({
      id: plan.id,
      name: plan.name,
      type: plan.type,
      price: String(plan.price),
      features: plan.features.join('\n'),
    });
    setIsEdit(true);
    setModalOpen(true);
  };

  const handleCreateNew = () => {
    setInitialValues({ id: '', name: '', type: '', price: '', features: '' });
    setIsEdit(false);
    setModalOpen(true);
  };

  const openConfirmDelete = (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/subscriptions/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Plan deleted!');
      fetchPlans();
    } catch (err: any) {
      toast.error('Error deleting plan:', err);
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <nav className="text-sm text-gray-500">
            <span>🏠 / Dashboards / Category</span>
          </nav>
        </div>

        <div className="mb-4">
          <button
            onClick={handleCreateNew}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create New Plan
          </button>
        </div>

        <PlanFormModal
          isEdit={isEdit}
          isOpen={modalOpen}
          initialValues={initialValues}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />

        <ConfirmModal
          isOpen={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={confirmDelete}
          message="Are you sure want to delete this plan?"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={handleEdit}
              onDelete={openConfirmDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
