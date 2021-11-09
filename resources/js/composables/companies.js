import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

export default function useCompanies() {
    const companies = ref([])
    const router = useRouter()
    const errors = ref('')

    const getCompanies = async () => {
        let response = await axios.get('/api/companies')
        companies.value = response.data.data;
    }

    const storeCompany = async (data) => {
        errors.value = []
        try {
            await axios.post('/api/companies', data)
            await router.push({ name: 'companies.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value.push(e.response.data.errors[key][0])
                }
            }
        }
    }

    const destroyCompany = async (id) => {
        await axios.delete(`/api/companies/${id}`)
    }

    return {
        companies,
        errors,
        getCompanies,
        storeCompany,
        destroyCompany
    }
}
