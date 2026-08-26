import { useCallback, useEffect, useState } from "react";
import adminApi from "../../api/admin.api.js";

const useAdminUsers = () => {
  const [users, setUsers] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(
    async ({
      page = pagination.page,
      searchValue = search,
      roleValue = role,
      statusValue = status,
    } = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await adminApi.getUsers({
          page,
          limit: pagination.limit,
          search: searchValue,
          role: roleValue,
          status: statusValue,
        });

        setUsers(result.data?.users || []);

        setPagination((current) => ({
          ...current,
          ...(result.data?.pagination || {}),
        }));
      } catch (error) {
        const message =
          error.response?.data?.message || "Failed to load users.";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination.page, pagination.limit, search, role, status],
  );

  useEffect(() => {
    fetchUsers({
      page: 1,
      searchValue: "",
      roleValue: "",
      statusValue: "",
    });
  }, []);

  const handleSearch = (value) => {
    setSearch(value);

    fetchUsers({
      page: 1,
      searchValue: value,
      roleValue: role,
      statusValue: status,
    });
  };

  const handleRoleChange = (value) => {
    setRole(value);

    fetchUsers({
      page: 1,
      searchValue: search,
      roleValue: value,
      statusValue: status,
    });
  };

  const handleStatusChange = (value) => {
    setStatus(value);

    fetchUsers({
      page: 1,
      searchValue: search,
      roleValue: role,
      statusValue: value,
    });
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages || page === pagination.page) {
      return;
    }

    fetchUsers({
      page,
      searchValue: search,
      roleValue: role,
      statusValue: status,
    });
  };

  const refresh = () => {
    fetchUsers({
      page: pagination.page,
      searchValue: search,
      roleValue: role,
      statusValue: status,
    });
  };

  return {
    users,
    pagination,

    search,
    role,
    status,

    isLoading,
    error,

    setSearch,
    setRole,
    setStatus,

    handleSearch,
    handleRoleChange,
    handleStatusChange,
    handlePageChange,

    refresh,
  };
};

export default useAdminUsers;
