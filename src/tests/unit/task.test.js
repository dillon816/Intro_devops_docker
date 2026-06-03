const validateTask = (data) => {
  const errors = [];
  if (!data.description) errors.push('description est obligatoire');
  if (data.status && !['todo', 'in_progress', 'done'].includes(data.status)) {
    errors.push('status invalide');
  }
  return errors;
};

describe('Validation tâche', () => {
  test('valide si description présente', () => {
    expect(validateTask({ description: 'ok' })).toHaveLength(0);
  });

  test('invalide si description absente', () => {
    expect(validateTask({})).toContain('description est obligatoire');
  });

  test('invalide si status inconnu', () => {
    expect(validateTask({ description: 'ok', status: 'weird' })).toContain('status invalide');
  });

  test('valide avec status done', () => {
    expect(validateTask({ description: 'ok', status: 'done' })).toHaveLength(0);
  });
});