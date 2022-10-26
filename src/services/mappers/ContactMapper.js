class ContactMapper {
  toPersistence(domainContact) {
    return {
      id: domainContact.id,
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.categoryId
    }
  }

  toDomain(persintenceContact) {
    return {
      id: persintenceContact.id,
      name: persintenceContact.name,
      email: persintenceContact.email,
      phone: persintenceContact.phone,
      category: {
        id: persintenceContact.category_id,
        name: persintenceContact.category_name,
      }
    }
  }
}

export default new ContactMapper();