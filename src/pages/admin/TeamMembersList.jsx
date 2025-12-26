import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';

const TeamMembersList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError('');
      const q = query(collection(db, 'team_members'), orderBy('sortOrder', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMembers(data);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (memberId, current) => {
    try {
      setUpdating(memberId);
      await updateDoc(doc(db, 'team_members', memberId), {
        isVisible: !current,
        updatedAt: new Date(),
      });
      setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, isVisible: !current } : m)));
    } catch (err) {
      console.error('Error updating visibility:', err);
      setError('Failed to update visibility');
    } finally {
      setUpdating(null);
    }
  };

  const handleSortChange = async (memberId, value) => {
    const order = parseInt(value, 10) || 0;
    try {
      setUpdating(memberId);
      await updateDoc(doc(db, 'team_members', memberId), {
        sortOrder: order,
        updatedAt: new Date(),
      });
      setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, sortOrder: order } : m)));
    } catch (err) {
      console.error('Error updating sort order:', err);
      setError('Failed to update sort order');
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div
          style={{
            display: 'inline-block',
            width: '48px',
            height: '48px',
            border: '4px solid #f3f4f6',
            borderTopColor: '#667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a202c' }}>Team Members</h1>
        <Link
          to="/admin/team-members/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: '#667eea',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#5568d3')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#667eea')}
        >
          ➕ Add Member
        </Link>
      </div>

      {error && (
        <div
          style={{
            background: '#FEE2E2',
            border: '1px solid #FCA5A5',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px',
            color: '#991B1B',
          }}
        >
          {error}
        </div>
      )}

      {members.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 20px',
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
          }}
        >
          <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '16px' }}>
            No team members yet. Add your first entry.
          </p>
          <Link
            to="/admin/team-members/new"
            style={{
              display: 'inline-block',
              padding: '10px 18px',
              background: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Add Team Member
          </Link>
        </div>
      ) : (
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            overflowX: 'auto',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>Name</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>Role</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>Visible</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>Sort Order</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111827' }}>{member.name}</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{member.role}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={!!member.isVisible}
                        onChange={() => toggleVisibility(member.id, member.isVisible)}
                        disabled={updating === member.id}
                      />
                      <span style={{ fontSize: '13px', color: '#374151' }}>
                        {member.isVisible ? 'Shown' : 'Hidden'}
                      </span>
                    </label>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <input
                      type="number"
                      defaultValue={member.sortOrder || 0}
                      onBlur={(e) => handleSortChange(member.id, e.target.value)}
                      style={{
                        width: '90px',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '13px',
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Link
                      to={`/admin/team-members/${member.id}`}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: '#f3f4f6',
                        color: '#111827',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: '600',
                      }}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeamMembersList;
