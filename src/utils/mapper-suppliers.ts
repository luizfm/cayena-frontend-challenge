import { Suppliers } from '../types/suppliers'
import { phoneMask } from './masks'

export const mapSuppliers = (suppliers?: Suppliers[]) => {
  if (!Array.isArray(suppliers)) {
    return []
  }

  return suppliers.map((supplier) => ({
    id: supplier.publicId,
    rowCells: [
      supplier.name,
      supplier.cnpj,
      phoneMask(supplier.phoneNumber),
      supplier.ownerName,
    ],
  }))
}
